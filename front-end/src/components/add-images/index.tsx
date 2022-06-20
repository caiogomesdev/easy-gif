import React, { useState } from 'react';
import './styles.css';

const App: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);

  function handleDrag(event: React.FormEvent<HTMLElement>){
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  }

  function handleDrop(event: React.DragEvent<HTMLHeadingElement>){
    console.log('drop')
    getUrlImage(event.dataTransfer as DataTransfer);
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }

  document.onpaste = function(pasteEvent: ClipboardEvent){
    var dataTransfer = pasteEvent.clipboardData as DataTransfer;
    getUrlImage(dataTransfer);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    event.preventDefault();
    if (event.target.files && event.target?.files[0]) {
      fileToUrlImage(event.target.files[0]);
    }
  }

  function getUrlImage(dataTransfer: DataTransfer){
    if(!dataTransfer) return;
    var item = dataTransfer.items[0];
    var blob = item.getAsFile() as File;
    fileToUrlImage(blob);
  }

  function fileToUrlImage(file: File){
    if(!file?.type?.startsWith('image/')) return;
    var reader = new FileReader();
    reader.onloadend = function(event: ProgressEvent<FileReader>){
      const url = event.target?.result
        console.log(url);
    };
    reader.readAsDataURL(file);
  }

  async function handleClick(){
    try {
      const clip = await navigator.clipboard.read()
      let image_type = '';
      const item = clip.find(item =>
        item.types.some(type => {
          const isImage = type.startsWith('image/');
          if(isImage){
            image_type = type;
          }
          return isImage;
        }));
        const file = await item?.getType( image_type );
        fileToUrlImage(file as File);
    }catch {}
  }

  return (
    <div className='containerCanva'>
      <form id="form-file-upload">
        <input type="file" id="input-file-upload" multiple={false} onChange={handleChange} />
          <label id="label-file-upload" htmlFor="input-file-upload">
            <h1 className={`${dragActive ? 'drag-active': ''} more`}
            onDrop={handleDrop}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            > {dragActive ? 'Drop' : '+'}</h1>
          </label>
      </form>

      <div className='other-option'>
        <small>or</small>
        <button className='btn' onClick={handleClick}>Paste clipboard</button>
      </div>
    </div>
  )
}

export default App;
