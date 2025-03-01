import { ScrollArea } from "@radix-ui/themes";
import { renderInputs } from "features/renderInputs";
import { FIELDS_BASIC_INFO } from "features/Auth/FieldsData/candidate";
import style from "./style.module.css";
import { Button, Link } from "shared/ui";

interface IBasicInfoProps {
  basicInfoFormData: Partial<IBasicInfo>;
  errorsState?: ErrorState<IBasicInfo>;
  handleInputChange: (name: string, value: string) => void;
  handleNextStep: () => void;
}

export const BasicInfo = ({
  basicInfoFormData,
  errorsState,
  handleInputChange,
  handleNextStep,
}: IBasicInfoProps) => {
  return (
    <>
      <ScrollArea className={style.scroll}>
        <div className={style.inputs}>
          {renderInputs({
            fields: FIELDS_BASIC_INFO,
            formState: basicInfoFormData,
            errorsState,
            handleInputChange,
          })}
        </div>
      </ScrollArea>
      <div className={style.buttons}>
        <Button type="button" onClick={handleNextStep}>
          Sign Up
        </Button>
        <Link className={style.link} text="Log In" href="/auth/login" />
      </div>
    </>
  );
};
