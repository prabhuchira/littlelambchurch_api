import React from "react";



function AddSong(props){

    React.useEffect(()=>{
       

    },[])

    const songName = React.createRef();
    const date = React.createRef();
    const songLink = React.createRef();


    function saveAddMode(e){
        e.preventDefault();
        let newBody={
            SongName:songName.current.value,
        SongLink:  songLink.current.value,
        Date:  date.current.value,
        }
        
        props.saveAddSong(newBody)
    }


    return(
        <form>
        <div className="p-5">
            
         

            <div className="container-fluid">
            <h3 className="text-primary">Edit Song</h3>
            <hr/>
                <div class="row">
                  
  <div class="col-lg-6">
  <label for="basic-url">Song Name</label>
    <div class="input-group">
     

      <input type="text" ref={songName} class="form-control" placeholder="Song Name"  required/>
    </div>
  </div>
  <div class="col-lg-6">
  <label for="basic-url">Date</label>
    <div class="input-group">
      <input type="text" ref={date} class="form-control" placeholder="Date" required/>
     
    </div>
  </div>

  <div class="col-lg-12 my-2">
  <label for="basic-url ">Song Link</label>
    <div class="input-group">
        
      <input type="text" ref={songLink}  class="form-control" placeholder="Song Link" required/>
     
    </div>
  </div>

  <div className="text-center">
    <br /><br />
    <button className="btn btn-primary" onClick={(e)=>saveAddMode(e)} >Submit</button>
    <button onClick={props.closeAddMode} className="mx-2 btn btn-danger" >Cancel</button>
  </div>
  
</div>
            </div>


        </div>
       
        </form>
    )
}

export default AddSong;

