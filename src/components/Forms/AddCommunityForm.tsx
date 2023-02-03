/** @jsxImportSource theme-ui */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ICommunity } from "../../../types/interfaces";
import { createCommunity } from "../../services/communityService";
import { uploadImage } from "../../../helpers/cloudinary";

import { FilePondFile } from "filepond";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { useModalContext } from "../../contexts/modalContext";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type Props = {
  communityList: ICommunity[];
  setCommunityList: (arg: ICommunity[]) => void;
};
export default function AddCommunityForm({
  communityList,
  setCommunityList,
}: Props) {
  const initialState: ICommunity = {
    name: "",
    address: "",
  };
  const [imgFiles, setImgFiles] = useState<FilePondFile[]>([]);
  const [community, setCommunity] = useState<ICommunity>(initialState);
  const { handleModal } = useModalContext()

  const blobToDataURL = async (blob: Blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (community != initialState && imgFiles.length > 0) {
      const buffer = await imgFiles[0].file.arrayBuffer();
      const blob = new Blob([buffer]);
      const dataUrl = await blobToDataURL(blob);

      const newCommunity = await createCommunity({
        ...community,
        image: dataUrl as FilePondFile,
      });
      setCommunityList([...communityList, newCommunity] as ICommunity[]);
      setCommunity(initialState);
      setImgFiles([]);
      handleModal(null, ''); //close form
    } else {
      alert("All fields are required");
    }
  };

  return (
        <form
          sx={{ variant: "components.form" }}
        >
          <FilePond
            files={imgFiles.map((fileItem) => fileItem.file)}
            allowReorder={true}
            allowMultiple={false}
            onupdatefiles={setImgFiles}
            acceptedFileTypes={["image/*"]}
            name="files" /* sets the file input name, it's filepond by default */
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'

          />
          <input
            value={community.name}
            onChange={(e) =>
              setCommunity({ ...community, name: e.target.value })
            }
            type="text"
            placeholder="Community Name"
          ></input>
          <input
            value={community.address}
            onChange={(e) =>
              setCommunity({ ...community, address: e.target.value })
            }
            type="text"
            placeholder="Address"
          ></input>

          <button onClick={async (e) => await handleSubmit(e)}>
            Create Community
          </button>
        </form>
  );
}
