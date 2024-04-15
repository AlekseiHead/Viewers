import React, { useState } from 'react';
import Button, { ButtonEnums } from '../Button';
import { IExaminationResults } from 'platform/core/src/services/MedicalExaminationService/examinationResults';
import { useModal } from '../../contextProviders';
import { DicomMetadataStore } from '@ohif/core';

import { Formik, Field, FieldArray, Form } from 'formik';
import { Persist } from 'formik-persist';
import { Accordion } from 'flowbite-react';
//import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
//import S3Client = require('@aws-sdk/client-s3');

//Подключение сервиса по правилам OHIF//Connecting the service according to OHIF rules
//import { MedicalExaminationService } from '@ohif/core';
//Будет использовано для перевода i18next//Will be used to translate i18next
//import { useTranslation } from 'react-i18next';

//Получаем объект дата(В РАЗРАБОТКЕ)// Get Data object
//const currentDate = new Date();

//Credentials для s3//Credentials for s3
/*const s3Client = new S3Client({
  region: 'ru-central1-a',
  endpoint: 'https://storage.yandexcloud.net',
  credentials: {
    accessKeyId: process.env.REACT_APP_KEY_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  },
});*/
//Функция отправки sendJsonToS3 в s3 через s3Client//Function for sending sendJsonToS3 to s3 via s3Client
const sendJsonToS3 = async data => {
  const jsonString = JSON.stringify(data);
  //Получение StudyInstanceUID из Метаданных изображения//Getting StudyInstanceUID from Image Metadata
  const keyFileName = DicomMetadataStore.getStudyInstanceUIDs().at(-1) + '.json';
  const formBtn = document.querySelector('.send-btn');
  const params = {
    Bucket: 'cloud-packs-bucket', //Имя бакета//Bucket name
    Key: keyFileName, //Имя объекта//Object name
    Body: jsonString, //Тело файла//File body
    ContentType: 'application/json',
  };
  //Создание объекта и загрузка его в бакет в блоке try catch
  //Creating an object and loading it into a bucket in a try catch block
  //Использует AWS команду PutObjectCommand//Uses AWS PutObjectCommand
  try {
    //Изменение содержания кнопки Отправить//Changing the content of the Submit button
    formBtn.textContent = 'Загрузка...';
    //const results = await s3Client.send(new PutObjectCommand(params));
    //Вывод информации о созданном файле и пути в консоль
    //Output information about the created file and path to the console
    console.log(
      'Успешно создан ' + params.Key + ' и загружен в ' + params.Bucket + '/' + params.Key
    );
    alert('Протокол успешно отправлен!');
    //Установка задержки удаления из localStorage после нажатия submit
    //Set the delay for deleting from localStorage after pressing submit
    setTimeout(function () {
      localStorage.removeItem('exam-protocol-form');
    }, 3050);
    //return results;
  } catch (err) {
    //Обработка ошибок при отправвке//Handling errors when sending
    console.log('Ошибка: ', err);
    alert('Внимание! Протокол не отправлен, попробуйте позже!');
  } finally {
    formBtn.textContent = 'Отправить';
  }
};
//Неиспользуемые массивы полей select//Unused arrays of select fields
/*const TYPE_OF_NODULE = [
  {
    value: 'Солидный',
    label: 'Солидный',
  },
  {
    value: 'Частично солидный',
    label: 'Частично солидный',
  },
  {
    value: '«Матовое стекло»',
    label: '«Матовое стекло»',
  },
];

const LUNG_POSITION = [
  {
    value: 'Правое легкое',
    label: 'Правое легкое',
  },
  {
    value: 'Левое легкое',
    label: 'Левое легкое',
  },
];

const TYPE_OF_BENING_SIGNS = [
  {
    value: 'Нет',
    label: 'Нет',
  },
  {
    value: 'Кальцинация',
    label: 'Кальцинация',
  },
  {
    value: 'Жир',
    label: 'Жир',
  },
  {
    value: 'Внутрилегочный лимфоузел',
    label: 'Внутрилегочный лимфоузел',
  },
];

const TYPE_OF_LUNG_RADS = [
  {
    value: '0 Неполная (неопределенная)',
    label: '0 Неполная (неопределенная)',
  },
  {
    value: '1 Негативная: нет узелков в легких',
    label: '1 Негативная: нет узелков в легких',
  },
  {
    value: '1 Негативная: узелок(и) со специфическими обызвествлениями',
    label: '1 Негативная: узелок(и) со специфическими обызвествлениями',
  },
  {
    value: '2 Доброкачественные изменения: перифиссуральные узелок(и)',
    label: '2 Доброкачественные изменения: перифиссуральные узелок(и)',
  },
  {
    value: '2 Доброкачественные изменения: солидный узелок(и)',
    label: '2 Доброкачественные изменения: солидный узелок(и)',
  },
  {
    value: '2 Доброкачественные изменения: частично солидный узелок(и)',
    label: '2 Доброкачественные изменения: частично солидный узелок(и)',
  },
  {
    value: '2 Доброкачественные изменения: не солидный узелок(и) (GGN)',
    label: '2 Доброкачественные изменения: не солидный узелок(и) (GGN)',
  },
  {
    value: '3 Вероятно доброкачественные: солидный узелок(и)',
    label: '3 Вероятно доброкачественные: солидный узелок(и)',
  },
  {
    value: '3 Вероятно доброкачественные: частично солидный узелок(и)',
    label: '3 Вероятно доброкачественные: частично солидный узелок(и)',
  },
  {
    value: '3 Вероятно доброкачественные: не солидный узелок(и)(GGN)',
    label: '3 Вероятно доброкачественные: не солидный узелок(и)(GGN)',
  },
  {
    value: '4A Подозрительные: солидный узелок(и)',
    label: '4A Подозрительные: солидный узелок(и)',
  },
  {
    value: '4A Подозрительные: частично солидный узелок(и)',
    label: '4A Подозрительные: частично солидный узелок(и)',
  },
  {
    value: '4B Очень подозрительные: 	солидный узелок(и)',
    label: '4B Очень подозрительные: 	солидный узелок(и)',
  },
  {
    value: '4B Очень подозрительные: частично солидный узелок(и)',
    label: '4B Очень подозрительные: частично солидный узелок(и)',
  },
  {
    value: '4X Очень подозрительные',
    label: '4X Очень подозрительные',
  },
  {
    value: 'S Другие',
    label: 'S Другие',
  },
];
const RESULTS_OF_REVIEW = [
  {
    value: 'Совпадение',
    label: 'Совпадение',
  },
  {
    value: 'Присуствуют разночтения',
    label: 'Присуствуют разночтения',
  },
];

const REASONS_FOR_DIFFERENCE = [
  {
    value: 'Пропущен очаг/очаги',
    label: 'Пропущен очаг/очаги',
  },
  {
    value: 'Разночтения размеров более 1 мм',
    label: 'Разночтения размеров более 1 мм',
  },
  {
    value: 'Пропущена дополнительная находка',
    label: 'Пропущена дополнительная находка',
  },
];*/

//Массив значений для выбора select//Array of values for selecting
const TYPE_OF_ADDITIONAL_INF = [
  {
    value: 'Нет',
    label: 'Нет',
  },
  {
    value: 'Эмфизема',
    label: 'Эмфизема',
  },
  {
    value: 'Буллы',
    label: 'Буллы',
  },
  {
    value: 'Центральное образование',
    label: 'Центральное образование',
  },
  {
    value: 'Обтурационный ателектаз',
    label: 'Обтурационный ателектаз',
  },
  {
    value: 'Участки «матового стекла»',
    label: 'Участки «матового стекла»',
  },
  {
    value: 'Участки консолидации',
    label: 'Участки консолидации',
  },
  {
    value: 'Признаки туберкулеза',
    label: 'Признаки туберкулеза',
  },
  {
    value: 'Полость в легком',
    label: 'Полость в легком',
  },
  {
    value: 'Признаки мицетомы',
    label: 'Признаки мицетомы',
  },
  {
    value: 'Множественные кисты',
    label: 'Множественные кисты',
  },
  {
    value: 'Ретенционная киста',
    label: 'Ретенционная киста',
  },
  {
    value: 'Диссеминированный процесс',
    label: 'Диссеминированный процесс',
  },
  {
    value: 'Симптом «дерева в почках»',
    label: 'Симптом «дерева в почках»',
  },
  {
    value: 'Центрилобулярные очаги',
    label: 'Центрилобулярные очаги',
  },
  {
    value: 'Типичная ОИП',
    label: 'Типичная ОИП',
  },
  {
    value: 'Интерстициальные неуточненные изменения с фиброзированием',
    label: 'Интерстициальные неуточненные изменения с фиброзированием',
  },
  {
    value: 'Интерстициальные изменения неуточненные',
    label: 'Интерстициальные изменения неуточненные',
  },
  {
    value: 'Бронхоэктазы',
    label: 'Бронхоэктазы',
  },
  {
    value: 'Признаки венозного застоя',
    label: 'Признаки венозного застоя',
  },
  {
    value: 'Гидроторакс',
    label: 'Гидроторакс',
  },
  {
    value: 'Пневмоторакс',
    label: 'Пневмоторакс',
  },
  {
    value: 'Плевральные бляшки',
    label: 'Плевральные бляшки',
  },
  {
    value: 'Образования плевры',
    label: 'Образования плевры',
  },
  {
    value: 'Внтригрудная лимфаденопатия',
    label: 'Внтригрудная лимфаденопатия',
  },
  {
    value: 'Образование средостения',
    label: 'Образование средостения',
  },
  {
    value: 'ГПОД',
    label: 'ГПОД',
  },
  {
    value: 'Кальцинация коронарных артерий',
    label: 'Кальцинация коронарных артерий',
  },
  {
    value: 'Аневризма аорты',
    label: 'Аневризма аорты',
  },
  {
    value: 'Расширение легочных артерий',
    label: 'Расширение легочных артерий',
  },
  {
    value: 'Гидроперикард',
    label: 'Гидроперикард',
  },
  {
    value: 'Узлы щитовидной железы',
    label: 'Узлы щитовидной железы',
  },
  {
    value: 'Образование молочной железы',
    label: 'Образование молочной железы',
  },
  {
    value: 'Образование надпочечников',
    label: 'Образование надпочечников',
  },
  {
    value: 'Образования печени',
    label: 'Образования печени',
  },
];

const ResultsFormComponent: React.FC<IExaminationResults> = () => {
  const { hide } = useModal();
  //Закрытие модального окна после попытки отправки
  //Close the modal window after attempting to send
  const handleClose = () => {
    setTimeout(function () {
      hide();
    }, 3000);
  };
  //Закрытие модального окна по нажатию кнопки Закрыть
  //Closing the modal window by clicking the Close button
  const handleCloseOnCloseBtn = () => {
    hide();
  };
  //Checkbox состояние для expert_required (formik)//Checkbox state for expert_required (formik)
  const [checkbox, setCheckbox] = useState(false);
  const handleCheck = () => {
    setCheckbox(!checkbox);
  };
  return (
    <div className="pb-20">
      <Formik
        initialValues={{
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
        }}
        //Submit содержащий функцию отправки и закрытие окна
        //Submit containing the submit function and closing the window
        onSubmit={async (values: IExaminationResults) => {
          await new Promise(r => setTimeout(r, 500));
          sendJsonToS3(values);
          //Вывод в консоль седержимого отправляемого файла (для тестов)
          //Output the contents of the sent file to the console (for tests)
          console.log(JSON.stringify(values, null, 2));
          handleClose();
        }}
      >
        {({ values, handleChange, resetForm }) => (
          //Тело протокола//Protocol body
          <Form
            className="form"
            id="form"
          >
            {/*Массив очагов//Array of nodules*/}
            <FieldArray name="nodules">
              {({ remove, push }: any) => (
                <div className="nodules-container">
                  {values.nodules.length > 0 &&
                    values.nodules.map((nodule, index) => (
                      <div
                        key={index}
                        className="nodules-items bg-secondary-dark border-secondary-primary my-3 rounded p-4"
                      >
                        <table className="w-full text-white">
                          <tbody>
                            <tr>
                              <td>
                                <div className="my-1 text-xl font-bold underline">
                                  Очаг № {index + 1}
                                </div>
                              </td>
                            </tr>

                            <tr className="lung__position-select">
                              <td>
                                <label htmlFor={`nodules.${index}.lung_position`}>
                                  Выберите положение легкого:
                                </label>
                                <Field
                                  id={`nodules.${index}.lung_position`}
                                  name={`nodules.${index}.lung_position`}
                                  className="lung__position border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                                  type="text"
                                  as="select"
                                  //required //Сделать поле обязательным//Make the field required
                                >
                                  <option
                                    value=""
                                    disabled
                                  >
                                    Выберите расположение...
                                  </option>
                                  <option value="Левое">Левое</option>
                                  <option value="Правое">Правое</option>
                                </Field>
                              </td>
                            </tr>

                            <tr className="local__input">
                              <td>
                                <label htmlFor={`nodules.${index}.local`}>Локализация очага:</label>
                                <Field
                                  //В данном поле планируется получать dicom_id + body_part_examined
                                  //In this field it is planned to receive dicom_id + body_part_examined
                                  id={`nodules.${index}.local`}
                                  name={`nodules.${index}.local`}
                                  className="local border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Укажите локализацию очага..."
                                />
                              </td>
                            </tr>

                            <tr className="type__of-nodule-select">
                              <td>
                                <label htmlFor={`nodules.${index}.type_of_nodule`}>
                                  Тип очага:
                                </label>
                                <Field
                                  id={`nodules.${index}.type_of_nodule`}
                                  name={`nodules.${index}.type_of_nodule`}
                                  className="type__of-nodule border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                                  type="text"
                                  as="select"
                                >
                                  <option
                                    value=""
                                    disabled
                                  >
                                    Выберите тип...
                                  </option>
                                  <option value="Солидный">Солидный</option>
                                  <option value="Частично солидный">Частично солидный</option>
                                  <option value="«Матовое стекло»">«Матовое стекло»</option>
                                </Field>
                              </td>
                            </tr>

                            <tr className="size__of-finding-input">
                              <td>
                                <label htmlFor={`nodules.${index}.size_of_finding`}>
                                  Размер очага в мм:
                                </label>
                                <Field
                                  id={`nodules.${index}.size_of_finding`}
                                  name={`nodules.${index}.size_of_finding`}
                                  className="size__of-finding border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Укажите размер очага..."
                                />
                              </td>
                            </tr>

                            <tr className="volume__of-nodule-input">
                              <td>
                                <label htmlFor={`nodules.${index}.volume`}>
                                  Объём в мм<sup>3</sup>:
                                </label>
                                <Field
                                  id={`nodules.${index}.volume`}
                                  name={`nodules.${index}.volume`}
                                  className="volume border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Укажите объем очага..."
                                />
                              </td>
                            </tr>

                            <tr className="bening__signs-select">
                              <td>
                                <label htmlFor={`nodules.${index}.benign_signs`}>
                                  Признак доброкачественности:
                                </label>
                                <Field
                                  id={`nodules.${index}.benign_signs`}
                                  name={`nodules.${index}.benign_signs`}
                                  className="bening__signs border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                                  type="text"
                                  as="select"
                                >
                                  <option
                                    value=""
                                    disabled
                                  >
                                    Выберите признак...
                                  </option>
                                  <option value="Нет">Нет</option>
                                  <option value="Кальцинация">Кальцинация</option>
                                  <option value="Жир">Жир</option>
                                  <option value="Внутрилегочный лимфоузел">
                                    Внутрилегочный лимфоузел
                                  </option>
                                </Field>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {/*Кнопка удаления полей очага//Button for removing nodules fields*/}
                        <Button
                          onClick={() => remove(index)}
                          className="p-2"
                          startIcon={undefined}
                          endIcon={undefined}
                          name={undefined}
                        >
                          Удалить очаг
                        </Button>
                      </div>
                    ))}

                  {/*Кнопка создания новых полей очага//Button for creating new nodules fields*/}
                  <Button
                    onClick={() =>
                      push({
                        lung_position: '',
                        local: '',
                        type_of_nodule: '',
                        size_of_finding: '',
                        volume: '',
                        benign_signs: '',
                      })
                    }
                    className="my-3 ml-4 flex justify-end"
                    startIcon={undefined}
                    endIcon={undefined}
                    name={undefined}
                  >
                    Добавить очаг
                  </Button>
                </div>
              )}
            </FieldArray>
            {/*Основное тело протокола//Main body of the protocol*/}
            <div className="fields">
              <table className="w-full text-white">
                <tbody>
                  <tr className="lung__rads-11-select">
                    <td>
                      <label htmlFor="lung_rads_11">Категория Lung-RADS 1.1: </label>
                      <Field
                        id="lung_rads_11"
                        name="lung_rads_11"
                        className="lung__rads-11 border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                        as="select"
                        placeholder="Выберите категорию..."
                      >
                        <option
                          value=""
                          disabled
                        >
                          Выберите категорию...
                        </option>
                        <option value="0 Неполная (неопределенная)">
                          0 Неполная (неопределенная)
                        </option>
                        <option value="1 Негативная: нет узелков в легких">
                          1 Негативная: нет узелков в легких
                        </option>
                        <option value="1 Негативная: узелок(и) со специфическими обызвествлениями">
                          1 Негативная: узелок(и) со специфическими обызвествлениями
                        </option>
                        <option value="2 Доброкачественные изменения: перифиссуральные узелок(и)">
                          2 Доброкачественные изменения: перифиссуральные узелок(и)
                        </option>
                        <option value="2 Доброкачественные изменения: солидный узелок(и)">
                          2 Доброкачественные изменения: солидный узелок(и)
                        </option>
                        <option value="2 Доброкачественные изменения: частично солидный узелок(и)">
                          2 Доброкачественные изменения: частично солидный узелок(и)
                        </option>
                        <option value="2 Доброкачественные изменения: не солидный узелок(и) (GGN)">
                          2 Доброкачественные изменения: не солидный узелок(и) (GGN)
                        </option>
                        <option value="3 Вероятно доброкачественные: солидный узелок(и)">
                          3 Вероятно доброкачественные: солидный узелок(и)
                        </option>
                        <option value="3 Вероятно доброкачественные: частично солидный узелок(и)">
                          3 Вероятно доброкачественные: частично солидный узелок(и)
                        </option>
                        <option value="3 Вероятно доброкачественные: не солидный узелок(и)(GGN)">
                          3 Вероятно доброкачественные: не солидный узелок(и)(GGN)
                        </option>
                        <option value="4A Подозрительные: солидный узелок(и)">
                          4A Подозрительные: солидный узелок(и)
                        </option>
                        <option value="4A Подозрительные: частично солидный узелок(и)">
                          4A Подозрительные: частично солидный узелок(и)
                        </option>
                        <option value="4B Очень подозрительные: 	солидный узелок(и)">
                          4B Очень подозрительные: солидный узелок(и)
                        </option>
                        <option value="4B Очень подозрительные: частично солидный узелок(и)">
                          4B Очень подозрительные: частично солидный узелок(и)
                        </option>
                        <option value="4X Очень подозрительные">4X Очень подозрительные</option>
                        <option value="S Другие">S Другие</option>
                      </Field>
                    </td>
                  </tr>

                  <tr className="additional__inf-select">
                    <td>
                      <label htmlFor="additional_inf">Дополнительные находки (S): </label>
                      <p className="text-base italic">
                        Для выбора нескольких элементов зажмите &apos; Ctrl &apos;
                      </p>
                      <Field
                        id="additional_inf"
                        name="additional_inf"
                        className="additional__inf border-primary-main mb-2 w-full appearance-none rounded border bg-black py-7 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                        multiple
                        as="select"
                        value={values.additional_inf}
                        onChange={handleChange}
                        placeholder="Выберите элемент"
                      >
                        {TYPE_OF_ADDITIONAL_INF.map(option => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </td>
                  </tr>

                  <tr className="additional__inf-1-input">
                    <td>
                      <label htmlFor="additional_inf_1">Другие дополнительные находки (S): </label>
                      <Field
                        id="additional_inf_1"
                        name="additional_inf_1"
                        className="additional__inf-1 border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                        placeholder="Укажите находки..."
                        type="text"
                      />
                    </td>
                  </tr>

                  {/*Блок пересмотра и экспертного анализа//Revision and expert analysis block*/}
                  <tr className="expert__required-checkbox bg-secondary-dark border-secondary-primary mb-2 flex justify-center rounded p-4">
                    <th>
                      <label htmlFor="expert-required">
                        Необходимость экспертного анализа:
                        <Field
                          id="expert-required"
                          name="expert_required"
                          className="expert__required checkbox ml-2 mr-2 text-xl"
                          type="checkbox"
                          onClick={handleCheck}
                        />
                      </label>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <Accordion
                        className="border-primary-main mb-4 w-full appearance-none rounded border px-2 py-2 leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                        data-accordion="close"
                      >
                        <Accordion.Panel>
                          <Accordion.Content></Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                          <Accordion.Title>Поля для заполнения экспертом</Accordion.Title>
                          <Accordion.Content className="pt-2">
                            <label htmlFor="second_report">Результаты второго пересмотра: </label>
                            <Field
                              id="second_report"
                              name="second_report"
                              className="second__report border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                              as="select"
                              placeholder="Выберите элемент"
                            >
                              <option
                                value=""
                                disabled
                              >
                                Выберите результаты...
                              </option>
                              <option value="Совпадение">Совпадение</option>
                              <option value="Присуствуют разночтения">
                                Присуствуют разночтения
                              </option>
                            </Field>
                            <label htmlFor="expert_report">Причины разночтения: </label>
                            <Field
                              id="expert_report"
                              name="expert_report"
                              className="expert__report border-primary-main mb-2 w-full appearance-none rounded border bg-black py-2 px-3 text-base leading-tight text-white shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none"
                              as="select"
                            >
                              <option
                                value=""
                                disabled
                              >
                                Выберите причину...
                              </option>
                              <option value="Пропущен очаг/очаги">Пропущен очаг/очаги</option>
                              <option value="Разночтения размеров более 1 мм">
                                Разночтения размеров более 1 мм
                              </option>
                              <option value="Пропущена дополнительная находка">
                                Пропущена дополнительная находка
                              </option>
                            </Field>
                          </Accordion.Content>
                        </Accordion.Panel>
                      </Accordion>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*Кнопки управления протоколом//Protocol control buttons*/}
            <div className="flex justify-end">
              <Button
                data-cy="reset-btn"
                className="p-2"
                startIcon={undefined}
                endIcon={undefined}
                name={undefined}
                onClick={resetForm}
              >
                Очистить форму
              </Button>

              <Button
                data-cy="cancel-btn"
                className="ml-2 p-2"
                onClick={handleCloseOnCloseBtn}
                startIcon={undefined}
                endIcon={undefined}
                name={undefined}
              >
                {'Закрыть'}
              </Button>

              <Button
                data-cy="submit-btn"
                className="send-btn ml-2"
                disabled={undefined}
                startIcon={undefined}
                endIcon={undefined}
                name={undefined}
                onClick={undefined}
              >
                {'Отправить'}
              </Button>
            </div>
            {/*Persist сохраняет значение полей формы в localStorage
            //Persist stores the value of the form fields in localStorage*/}
            <Persist name="exam-protocol-form"></Persist>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResultsFormComponent;
