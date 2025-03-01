import { Pin } from "shared/ui";

type FormPin = string | ISuggestion | ISuggestion[];

interface IRenderFormPins {
  formInput: FormPin;
}

export const renderFormPins = (searchData: Record<string, FormPin>) => {
  const formPins = [];
  for (const key of Object.keys(searchData)) {
    const formInput = searchData[key];
    if (!formInput) continue;
    formPins.push(<RenderFormPin key={key} formInput={formInput} />);
  }

  return formPins;
};

const RenderFormPin = ({ formInput }: IRenderFormPins) => {
  if (typeof formInput === "string") return <Pin>{formInput}</Pin>;
  if (Array.isArray(formInput)) {
    return (
      <>
        {formInput.map((input) => (
          <Pin key={input.id}>{input.value}</Pin>
        ))}
      </>
    );
  }
  return <Pin>{formInput.value}</Pin>;
};
