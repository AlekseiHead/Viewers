import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ResultsFormComponent } from '@ohif/ui';
import { IExaminationResults } from 'platform/core/src/services/MedicalExaminationService/examinationResults';
import MedicalExaminationService from 'platform/core/src/services/MedicalExaminationService';
//import { ToolGroupManager } from '@cornerstonejs/tools';

//const medicalExaminationService = new MedicalExaminationService();
//Утилита для использования в расширении
//Utility for use in the extension
const ResultsForm = ({
  medicalExaminationService,
}: {
  medicalExaminationService: MedicalExaminationService;
}) => {
  const [examinationResult, setExaminationResult] = useState<IExaminationResults>({
    nodules: [
      {
        lung_position: '',
        local: '',
        type_of_nodule: '',
        size_of_finding: '',
        volume: '',
        benign_signs: '',
      },
    ],
    lung_rads_11: '',
    additional_inf: [],
    additional_inf_1: '',
    expert_required: false,
    second_report: '',
    expert_report: '',
  });

  useEffect(() => {
    const fetchExaminationResult = async () => {
      const currentMedicalExamination = await medicalExaminationService.read();
      setExaminationResult(currentMedicalExamination);
    };
    fetchExaminationResult();
  }, [medicalExaminationService]);
  //Пока не используемый элемент//Not yet used element
  /*useEffect(() => {
    const readData = async () => {
      const currentMedicalExamination = await medicalExaminationService.read();
      if (currentMedicalExamination) {
        try {
          const { ...examinationResult } = (JSON.stringify(
            currentMedicalExamination
          ) as unknown) as IExaminationResults;
          setExaminationResult({ ...examinationResult });
        } catch (error) {
          console.log(error);
        }
      }
    };
    readData();
  }, [medicalExaminationService]);

  /*useEffect(() => {
    const currentMedicalExamination = medicalExaminationService
      .read()
      .then(() => {
        setExaminationResult(currentMedicalExamination);
      });
  }, []);*/
  return <ResultsFormComponent {...examinationResult} />;
};

export default ResultsForm;
ResultsForm.propTypes = {
  onClose: PropTypes.func,
};
