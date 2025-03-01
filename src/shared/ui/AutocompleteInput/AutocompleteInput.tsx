import React, { ChangeEvent, useEffect, useState } from "react";
import classNames from "classnames";
import style from "./AutocompleteInput.module.css";
import { Multiselect } from "multiselect-react-dropdown";
import closeIcon from "assets/images/authocomplete/close.svg";
import arrow from "assets/images/arrow-down.svg";
import { isISuggestion, useFilteredSuggestions } from "./lib";
import { ScrollArea } from "@radix-ui/themes";
import { usePageWidth } from "shared/hooks";

interface IAutocompleteInput {
  icon?: string;
  placeholder: string;
  error?: string[];
  handleChange: (value: ISuggestion | ISuggestion[]) => void;
  multiselect?: boolean;
  value: ISuggestion | ISuggestion[];
  suggestions?: ISuggestion[];
  className?: string;
  onClick?: () => void;
  label?: string;
  labelIcon?: string;
  experience?: { [id: string]: ISuggestion };
  allowAnyOption?: boolean;
}

export const AutocompleteInput = ({
  icon,
  placeholder,
  error,
  handleChange,
  multiselect,
  suggestions,
  value,
  className,
  label,
  experience,
  labelIcon,
  onClick,
  allowAnyOption,
}: IAutocompleteInput) => {
  const width = usePageWidth();
  const [suggestionsList, setSuggestionsList] = useState(suggestions);
  const [fieldValue, setFieldValue] = useState<ISuggestion | ISuggestion[]>(
    value
  );
  const [savedValue, setSavedValue] = useState<ISuggestion | ISuggestion[]>(
    value
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [limit, setLimit] = useState(5);

  const filteredSuggestions = useFilteredSuggestions(
    fieldValue as ISuggestion,
    suggestions
  );

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  useEffect(() => {
    if (
      allowAnyOption &&
      suggestionsList &&
      experience &&
      Array.isArray(fieldValue)
    ) {
      const containsAnyOption = fieldValue.find((item) => item.id === "any");

      setLimit(containsAnyOption ? 1 : 5);

      if (!containsAnyOption && fieldValue.length > 0) {
        setSuggestionsList(suggestionsList.filter((item) => item.id !== "any"));
      }

      if (fieldValue.length === 0 && suggestionsList[0].id !== "any") {
        setSuggestionsList([{ id: "any", value: "Any" }, ...suggestionsList]);
      }
    }
  }, [experience, allowAnyOption, fieldValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newValue = { value: inputValue, id: "" };
    setFieldValue(newValue);
    handleChange(newValue);
    setShowSuggestions(inputValue.length >= 0);
  };

  const handleMultiselectSelect = (selectedList: ISuggestion[]) => {
    setSuggestionsList(suggestionsList?.filter((item) => item.id !== "any"));
    setFieldValue(selectedList);
    handleChange(selectedList);
  };

  const handleMultiselectRemove = (
    _: ISuggestion[],
    removedItem: ISuggestion
  ) => {
    setLimit(5);
    const updatedValue = (fieldValue as ISuggestion[]).filter(
      (item) => item.id !== removedItem.id
    );
    setFieldValue(updatedValue);
    handleChange(updatedValue);
  };

  const handleMouseDown = (suggestionId: string) => {
    if (!experience) return;
    const selectedSuggestion = experience[suggestionId];
    const newValue =
      suggestionId === "any" ? { value: "Any", id: "any" } : selectedSuggestion;

    setFieldValue(newValue);
    handleChange(newValue);
    setSavedValue(newValue);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    if (onClick) {
      setFieldValue(savedValue);
      handleChange(savedValue);
      setTimeout(() => setShowSuggestions(false), 200);
      return;
    }
    if (!isISuggestion(fieldValue)) {
      resetFieldValue();
    }
    if (!Array.isArray(fieldValue) && experience) {
      if (!experience[fieldValue.id] && fieldValue.value !== "Any") {
        resetFieldValue();
      }
    }
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const resetFieldValue = () => {
    const emptyValue = { value: "", id: "" };
    setFieldValue(emptyValue);
    handleChange(emptyValue);
  };

  const clearInput = () => {
    resetFieldValue();
    setSavedValue({ value: "", id: "" });
  };

  const renderError = (error: string[]) =>
    error.map((err, index) => (
      <div key={index} className={style.error}>
        <p className={style.error__text}>{err}</p>
      </div>
    ));

  return (
    <div className={style.container}>
      <div className={style.label__container}>
        {labelIcon && <img src={labelIcon} alt="Icon" />}
        {label && <label className={style.label}>{label}</label>}
      </div>
      <div
        className={classNames(
          error?.length && style.error,
          style.input__container,
          multiselect && style.multiselect,
          multiselect &&
            Array.isArray(fieldValue) &&
            fieldValue.length > 0 &&
            style.multiselect__big,
          className
        )}
      >
        <div className={style.arrow}>
          {isISuggestion(fieldValue) && fieldValue.id !== "" && !multiselect ? (
            <button className={style.delete} onClick={clearInput} />
          ) : (
            <img src={arrow} alt="arrow" />
          )}
        </div>
        <div className={style.wrapper}>
          {icon && (
            <>
              <img src={icon} alt="Icon" />
              <span></span>
            </>
          )}
          {multiselect ? (
            <Multiselect
              options={suggestionsList}
              onSelect={handleMultiselectSelect}
              onRemove={handleMultiselectRemove}
              selectedValues={fieldValue}
              displayValue="value"
              selectionLimit={limit}
              customCloseIcon={
                <img
                  src={closeIcon}
                  className={style.multiselect__button}
                  alt="close"
                />
              }
              placeholder={placeholder}
              style={{
                chips: {
                  background: "var(--secondary-indigo-color)",
                  color: "var(--primary-text-color)",
                  fontSize: "0.875rem",
                  borderRadius: "0.25rem",
                  fontWeight: 400,
                  margin: "0",
                },
                searchBox: {
                  border: "none",
                  color: "var(--grey-100)",
                  fontSize: width > 768 ? "1.125rem" : "0.875rem",
                  fontWeight: 400,
                  fontFamily: "Inter",
                  padding: "0",
                  lineHeight: 1.55,
                  width: "100%",
                  paddingRight: "1.25rem",
                  display: "flex",
                  gap: "2px",
                  flexWrap: "wrap",
                },
                optionContainer: {
                  background: "var(--primary-dark)",
                  border: "none",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                  color: "var(--grey-100)",
                  fontSize: "0.875rem",
                  maxHeight: "11rem",
                  overflow: "auto",
                },
                option: {
                  padding: "0.5rem",
                  background: "var(--grey-550)",
                },
              }}
            />
          ) : (
            <input
              type="text"
              value={isISuggestion(fieldValue) ? fieldValue.value : ""}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleBlur}
              onClick={onClick}
              className={style.input}
              placeholder={placeholder}
            />
          )}
        </div>
      </div>
      {showSuggestions && (
        <ul className={style.select}>
          <ScrollArea className={style.scroll}>
            {filteredSuggestions?.map((suggestion, index) => (
              <button
                key={index}
                className={style.option}
                onMouseDown={() => handleMouseDown(suggestion.id)}
              >
                {suggestion.value}
              </button>
            ))}
          </ScrollArea>
        </ul>
      )}
      {error && renderError(error)}
    </div>
  );
};
