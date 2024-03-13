import { CommandsManager } from '../../classes';
import { ExtensionManager } from '../../extensions';
import { PubSubService } from '../_shared/pubSubServiceInterface';
import { IExaminationResults } from './examinationResults';

const EVENTS = {};
//Регистрация сервиса в CommandsManager и ExtensionManager
//Register the service in CommandsManager and ExtensionManager
class MedicalExaminationService extends PubSubService {
  public static REGISTRATION = {
    name: 'medicalExaminationService',
    altName: 'MedicalExaminationService',
    create: ({ commandsManager }) => {
      return new MedicalExaminationService(commandsManager);
    },
  };
  _commandsManager: CommandsManager;
  extensionManager: ExtensionManager;
  static write: any;

  constructor(commandsManager: CommandsManager) {
    super(EVENTS);
    this._commandsManager = commandsManager;
  }

  public init(extensionManager: ExtensionManager): void {
    this.extensionManager = extensionManager;
  }
  //Функция чтения данных интерфейса//Function for reading interface data
  async read() {
    const examinationResult: IExaminationResults = {
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
    };
    return examinationResult;
  }
  //Планируется перенос функции отправки в данный файл после тестов
  //It is planned to move the sending function to this file after tests
  /*async write(examinationResult: IExaminationResults) {}*/
}

export default MedicalExaminationService;
