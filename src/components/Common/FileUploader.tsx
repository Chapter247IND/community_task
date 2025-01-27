import { FileUploadType } from "@/types";
import { FileUploaderInput } from "./style";

const FileUploader: React.FC<FileUploadType> = ({
    handleImageChange,
    caption
}) => {
    return (
        <FileUploaderInput htmlFor="upload-button" >
            <span>{caption}</span>
            <input
                id="upload-button"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
            />
        </FileUploaderInput>
    )
}

export default FileUploader;