import {FileBase64} from '../../models/file-base64.model';
import {FileType, FileTypes} from '../../models/file-type.model';
import {MimeType} from '../../models/mime-type.enum';

export const convertFileToBase64Format = (file: File) => new Promise<FileBase64>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve({
    name: file.name,
    type: file.type as MimeType,
    size: file.size,
    base64Content: reader.result as string
  });
  reader.onerror = error => reject(error);
});

export const fileTypesToString = (fileTypes: FileTypes): string => {
  return fileTypes.map((type: FileType) => `.${type}`).join(', ');
}

export const getFileTypeByMimeType = (mimeType: MimeType): FileType => {
  const MIME_TYPE_TO_FILE_TYPE_MAP: {[key in MimeType]: FileType} = {
    [MimeType.JPEG]: 'jpg',
    [MimeType.PNG]: 'png',
    [MimeType.PDF]: 'pdf',
  };
  return MIME_TYPE_TO_FILE_TYPE_MAP[mimeType as MimeType];
}
