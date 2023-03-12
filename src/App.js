import React, { useState } from 'react';
import { Box } from '@mui/material';
import {Typography,Button,Input} from '@mui/material';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => 
      
        
        response.json())
      .then(data => {
        console.log(data)
        setResponse(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Box sx={{display:"flex" ,flexDirection:"column", padding:"30px", gap:"20px",alignItems:"center"}}>
      <Typography variant ="h3"> Find your shoe!</Typography>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileInput} />
        <Button type="submit" variant="contained" disabled={!selectedFile}>Upload</Button>
       
      </form>
      <Button onClick={()=>
      {setResponse(null)
      setSelectedFile(null)
      window.location.reload()
      }}> clear </Button>
  <>
    {response!==null?
    <>
      <img src={`data:image/jpeg;base64,${response?.image}`} height="330px" width="640px" />
    <h6> product: {response?.prediction}  </h6>
    </>:<Typography> Upload an image of a shoe to find!</Typography>}
    </>
   

    
    
  
    </Box>
  );
}

export default App;