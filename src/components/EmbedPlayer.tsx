import { TextField } from '@mui/material'
import { useState } from 'react'
import { Button } from '@mui/material'

const EmbedPlayer = () =>{
    const [youtubeURL,setYoutubeURL] = useState('');
    const [youtubeEmbedPlayer,setYoutubeEmbedPlayer] = useState(false);
    const [youtubeEmbedLink,setYoutubeEmbedLink] = useState('');

    function handleSubmitButton(){
        youtubeURL.replace('m.youtube','youtube')
        
        var youtubeRegex: RegExp;
        if(youtubeURL.search('youtu.be')!==1)
        {
            youtubeRegex = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/
        }
        else{
            youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([^\s&]+)/;
        }
        
        const match = String(youtubeURL).match(youtubeRegex);
        
        const youtubeID = match ? match[1] : '';
        console.log('after',youtubeID);
        // Check ID valid
        if (youtubeID){
            setYoutubeEmbedLink("https://www.youtube.com/embed/" + youtubeID +"?autoplay=1") ;
            setYoutubeEmbedPlayer(true);
            console.log(youtubeEmbedLink.valueOf());
            
        }
    }

    const YoutubeEmbedPlayer = () =>{
        return (
            <>
                <div className="ratio ratio-16x9" >
                    <iframe
                        width={0}
                        height={0}
                        src={youtubeEmbedLink}
                        title="Vimeo Video"
                        allow="autoplay; fullscreen"
                        referrerPolicy="no-referrer"
                        allowFullScreen={true}
                    />
                </div>
            </>
        )
    }   
    

    return (
        <div>
           
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <TextField id="outlined-basic" label="Paste Youtube link" variant="outlined"
                    sx={{
                        // Root class for the input field
                        "& .MuiOutlinedInput-root": {
                        color: "#000",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        // Class for the border around the input field
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                            borderWidth: "2px",
                        },
                        },
                        // Class for the label of the input field
                        "& .MuiInputLabel-outlined": {
                        color: "white",
                        },
                        margin:"normal",
                        input:{
                            color:'white'
                        }
                    }}
                    InputProps={{
                        style:{
                            borderRadius:'40px',
                            textAlign:'center'
                        }
                    }}
                    onChange={(event)=>setYoutubeURL(event.target.value)}
                    autoComplete='off'
                />
                <Button 
                    variant='contained' 
                    onClick={e=>
                        {
                            e.preventDefault();
                            handleSubmitButton();
                        }
                    }
                    style={{
                        textTransform:'none'
                    }}
                    >Start Listening!
                </Button>
                        
            </div >
            
            {youtubeEmbedPlayer && (
                <div style={{marginTop:'20px'}}>
                    <YoutubeEmbedPlayer/>
                </div>)
            }
            
            
        </div>
    )
}
export default EmbedPlayer