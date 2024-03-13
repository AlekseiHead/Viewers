export interface IExaminationResults {
  nodules: [
    {
      lung_position: string;
      local: string;
      type_of_nodule: string;
      size_of_finding: string;
      volume: string;
      benign_signs: string;
    }
  ];
  lung_rads_11: string;
  additional_inf: string[];
  additional_inf_1: string;
  expert_required: boolean;
  second_report: string;
  expert_report: string;
}
