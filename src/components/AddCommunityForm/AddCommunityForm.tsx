/** @jsxImportSource theme-ui */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ICommunity } from '../../../types/interfaces';
import { createCommunity } from '../../services/communityService';
import { uploadImage } from '../../../helpers/cloudinary';

import { FilePondFile } from 'filepond';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type Props = {
  communityFormToggle: boolean;
  setCommunityFormToggle: (arg:boolean) => void;
}
export default function AddCommunityForm({communityFormToggle, setCommunityFormToggle}: Props){
  const initialState: ICommunity = {
    name: '',
    address: '',
  };
  const [imgFiles, setImgFiles] = useState<FilePondFile[]>([]);
  const [community, setCommunity] = useState<ICommunity>(initialState);

  const blobToDataURL = async (blob: Blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (community != initialState && imgFiles.length > 0) {

      const buffer = await imgFiles[0].file.arrayBuffer();
      const blob = new Blob([buffer]);
      const dataUrl = await blobToDataURL(blob);
      //console.log(dataUrl);
      //const uploadedImg = await uploadImage(dataUrl as string, "community-cover-photos");

      const newCommunity = await createCommunity(
        { ...community, image: dataUrl}
      );
      console.log(newCommunity);
      setCommunity(initialState);
      setImgFiles([]);

    } else {
      alert('All fields are required');
    }
  };

  return (
    <div sx={{ display: "flex", justifyContent: "center" }}>
      <section sx={{variant: 'containers.singlePageFormCont'}}>
        <form sx={{variant: 'components.form', position: 'absolute', top: '75px'}}>
          <FontAwesomeIcon
          icon={faXmark as IconProp}
          sx={{alignSelf: 'flex-end'}}
          onClick={() => setCommunityFormToggle(!communityFormToggle)}
          />
          <FilePond
            files={imgFiles.map((fileItem) => fileItem.file)}
            allowReorder={true}
            allowMultiple={false}
            onupdatefiles={setImgFiles}
            acceptedFileTypes={['image/*']}
            name="files" /* sets the file input name, it's filepond by default */
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          <input
          value={community.name}
          onChange={(e) => setCommunity({ ...community, name: e.target.value })}
          type="text"
          placeholder="Community Name"
          ></input>
          <input
          value={community.address}
          onChange={(e) => setCommunity({ ...community, address: e.target.value })}
          type="text"
          placeholder="Address"
          ></input>

          <button
            onClick={async (e) => await handleSubmit(e)}
          >
            Create Community
          </button>
        </form>
      </section>
    </div>
  )
}