import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  SnackBar,
  SelectSuggestion,
} from "shared/ui";
import searchIcon from "assets/images/search/glass.svg";
import usersIcon from "assets/images/search/users.svg";
import editIcon from "assets/images/profile/editIcon.svg";
import sectorIcon from "assets/images/search/sectorIcon.svg";
import style from "./search.module.css";
import {
  CONSTRUCTION_FIELDS,
  HOSPITALITY_FIELDS,
  initialConstructionData,
  initialHospitalityData,
  INDUSTRIAL_FIELDS,
  initialIndustrialData,
} from "./fields";
import { renderFormPins } from "features/renderFormPin";
import { SearchInputs } from "features/search-inputs";
import {
  useGetSuggestions,
  useInitializeForm,
  usePageWidth,
} from "shared/hooks";
import classNames from "classnames";
import { ScrollArea } from "@radix-ui/themes";

interface ISearchCandidatesForm {
  searchFields: ISearchState;
  setSearchFields: (sector: ISuggestion, fields: ISearchForms) => void;
  setCurrentPage: (page: number) => void;
}

const hideInputs = (isRenderPins: boolean, width: number) =>
  width < 768 && isRenderPins;

export const SearchCandidatesForm = ({
  searchFields,
  setSearchFields,
  setCurrentPage,
}: ISearchCandidatesForm) => {
  const width = usePageWidth();
  const { suggestions, experience } = useGetSuggestions();
  const [sector, setSector] = useState<ISuggestion>({ value: "", id: "" });
  const [isSearch, setIsSearch] = useState(false);
  const [isRenderPins, setIsRenderPins] = useState(false);

  const hospitalityForm = useInitializeForm(
    initialHospitalityData,
    HOSPITALITY_FIELDS
  );

  const constructionForm = useInitializeForm(
    initialConstructionData,
    CONSTRUCTION_FIELDS
  );

  const industrialForm = useInitializeForm(
    initialIndustrialData,
    INDUSTRIAL_FIELDS
  );

  const forms = {
    Hospitality: hospitalityForm,
    Construction: constructionForm,
    "Industrial & Driving": industrialForm,
  };

  const currentForm = forms[sector.value as keyof typeof forms] || {};

  useEffect(() => {
    setIsSearch(false);
    setIsRenderPins(false);
  }, [sector, currentForm.formDataChange]);

  useEffect(() => {
    if (!searchFields?.sector.value) {
      return;
    }
    if (sector && searchFields?.fields && searchFields.sector) {
      setSearchFields(sector, currentForm.formDataChange as ISearchForms);
    }
  }, [sector]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    const { formDataChange, validateFields } = currentForm;
    const hasErrors = validateFields();

    if (hasErrors) return;

    if (formDataChange.distance && !formDataChange.postcode) {
      SnackBar({ text: "Please enter a postcode" });
      return;
    }

    setCurrentPage(1);
    setIsSearch(true);
    setIsRenderPins(true);
    setSearchFields(sector, formDataChange as ISearchForms);
  };

  const commonProps = suggestions &&
    experience && {
      sector,
      suggestion: suggestions,
      handleConfirm: handleSearch,
      experience,
    };

  return (
    <Card
      className={classNames(
        style.inputs,
        style.card,
        isSearch && style.searched
      )}
    >
      <div className={style.header}>
        <CardHeader image={usersIcon} title="Find your candidate" />
      </div>
      <ScrollArea scrollbars="vertical" className={style.scroll}>
        <div className={style.input__sector}>
          {!sector?.value && (
            <span>Select a sector to start searching for candidates.</span>
          )}
          {suggestions && (
            <SelectSuggestion
              options={suggestions.sectors}
              value={sector}
              handleChange={setSector}
              placeholder="Select"
              label="Sector"
              labelIcon={sectorIcon}
            />
          )}
        </div>
        {sector?.value && commonProps && currentForm.normalizedData && (
          <SearchInputs
            {...commonProps}
            errorsState={currentForm.errorsState}
            fields={currentForm.fields}
            formData={currentForm.normalizedData}
            handleInputChange={currentForm.handleInputChange}
            handleAutocompleteChange={currentForm.handleAutocompleteChange}
            hideInputs={hideInputs(isRenderPins, width)}
          />
        )}
      </ScrollArea>
      {width <= 769 && !isSearch && (
        <div className={style.search__button}>
          <Button variant="primary" onClick={handleSearch}>
            <img src={searchIcon} alt="Search" />
            Search
          </Button>
        </div>
      )}
      {width > 769 && (
        <div className={style.search__button}>
          <Button variant="primary" onClick={handleSearch}>
            <img src={searchIcon} alt="Search" />
            Search
          </Button>
        </div>
      )}
      {width < 768 && isSearch && (
        <>
          <div className={style.search__data}>
            {sector?.value &&
              currentForm.normalizedData &&
              renderFormPins(currentForm.normalizedData)}
          </div>
          <div className={style.edit__button}>
            <Button
              onClick={() => {
                setIsSearch(false);
                setIsRenderPins(false);
              }}
              variant="primary"
            >
              <img src={editIcon} alt="Edit" /> Edit
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
