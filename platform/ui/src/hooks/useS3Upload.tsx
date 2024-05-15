//Для того, чтобы увидеть ошибку можно просто подключить данный файл в
//platform\ui\src\hooks\index.ts и прописать его в экспорте по аналогии
import { useCallback, useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// Хук для загрузки файлов на S3
const useS3Upload = ({ bucketName, region, accessKeyId, secretAccessKey }) => {
  const [uploadStatus, setUploadStatus] = useState('idle');

  // Функция для загрузки файла
  const uploadToS3 = useCallback(
    async (file, key) => {
      const client = new S3Client({
        region: region,
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        },
      });

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file,
      });

      try {
        setUploadStatus('uploading');
        await client.send(command);
        setUploadStatus('success');
      } catch (error) {
        console.error('Error uploading to S3', error);
        setUploadStatus('error');
      }
    },
    [bucketName, region, accessKeyId, secretAccessKey]
  );

  return { uploadToS3, uploadStatus };
};

export default useS3Upload;
