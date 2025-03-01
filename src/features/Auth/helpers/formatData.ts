function isHospitalityFormData(
  formData:
    | ICandidateHospitalityFormData
    | ICandidateConstructionFormData
    | ICandidateIndustrialFormData
): formData is ICandidateHospitalityFormData {
  return formData.sector.value === "Hospitality";
}

function isConstructionFormData(
  formData:
    | ICandidateHospitalityFormData
    | ICandidateConstructionFormData
    | ICandidateIndustrialFormData
): formData is ICandidateConstructionFormData {
  return formData.sector.value === "Construction";
}

export const buildCandidateDataForSignup = (
  formData:
    | ICandidateHospitalityFormData
    | ICandidateConstructionFormData
    | ICandidateIndustrialFormData
) => {
  const candidateSharedData = {
    sector_id: formData.sector.id,
    years_experience_id: formData.yearsExperience,
    agreement_to_contact: formData.agreeToBeContacted || false,
    daily_job_update_id: formData.dailyJobUpdatePreference || "",
  };
  let candidateData = {};
  if (isHospitalityFormData(formData)) {
    candidateData = {
      hospitality_first_role_id: formData.hospitalityFirstRole,
      hospitality_second_role_id: formData.hospitalitySecondRole,
      hospitality_main_establishment_id: formData.hospitalityMainEstablishment,
      hospitality_second_establishment_id:
        formData.hospitalitySecondEstablishment,
      skill_ids: formData.skills,
    };
  } else if (isConstructionFormData(formData)) {
    candidateData = {
      construction_role_id: formData.constructionRole,
      construction_card_type_id: formData.constructionCardType,
    };
  } else {
    candidateData = {
      industrial_and_driving_role_id: formData.industrialRole,
      industrial_and_driving_licence_ids: formData.industrialLicence,
      industrial_and_driving_availability_ids: formData.industrialAvailability,
    };
  }

  const data: ISignUpCandidateData = {
    role: "CANDIDATE",
    userData: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone_number: formData.phone,
      postcode: formData.postalCode,
    },
    candidateData: { ...candidateData, ...candidateSharedData },
  };
  return data;
};

export const buildRecruiterDataForSignup = (recruiterData: IFormData) => {
  const data: ISignUpRecruiterData = {
    role: "RECRUITER",
    userData: {
      first_name: recruiterData.firstName,
      last_name: recruiterData.lastName,
      email: recruiterData.email,
      password: recruiterData.password,
      phone_number: recruiterData.phone,
      postcode: recruiterData.postalCode,
    },
    recruiterData: {
      company_name: recruiterData.companyName,
    },
  };
  return data;
};
