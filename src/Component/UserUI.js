import React, { useEffect } from "react";
import './UserUI.css'
import { useState } from "react";
import './UserUI.css'

const UserUI=()=>{
    const [test,settest]=useState(false)
    const [data,setdata]=useState({
        ProductId:'',
        ProductName:'',
        Productprice:'',
        
    })
    const [products,setproducts]=useState([])
    useEffect(()=>{

       (async()=>{
        await fetch(' https://infoget.pk6361439.workers.dev',{
            method:'GET'
        })
        .then(async(response)=>{
            await response.text().then((val)=>{
                console.log(val)
                console.log(JSON.parse(val))
              setproducts(JSON.parse(val))
              
            })

            
        })
       })()
        
    },[])
    let name1,value;
    const getData=(e)=>{
        name1=e.target.name;
        value=e.target.value;
        setdata({...data,[name1]:value});
    }
    const [files, setFiles] = useState(null)  
const filesHandler = (e) => {
     
     console.log(e.target.files[0]);
    setFiles(e.target.files[0]);
    // imgFile=r.result
    let file=e.target.files[0]
    let reader=new FileReader();
    reader.onload=function(event)
    {
        setFiles(event.target.result);
    }
    reader.readAsArrayBuffer(file)
}
const dataSubmit=async()=>{
    await fetch(`https://image.pk6361439.workers.dev?key=${data.ProductId}`,{
        method: 'POST',
        headers: {
            'Content-Type': '*'
        },
    
        body:files
    })
    .then(async(response)=>{
        await response.text().then((value)=>{
          console.log(value)
          
        })
    
      })
        const test ={
            'ProductId':data.ProductId,
            'ProductName':data.ProductName,
            'ProductPrice':data.Productprice
        }

        console.log(JSON.stringify(test))
    
    await fetch('https://info.pk6361439.workers.dev',{
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },

        body: JSON.stringify(test)
    })
    .then(async(response)=>{
        console.log(response)
        console.log('Data Submit operation perfomed')
        alert('Product Added/updated Please refresh the page for updated list')
        settest(true)
    })
    
     console.log(files[0])
    setdata({
        ProductId:'',
        ProductName:'',
        Productprice:''
    });
    setFiles(null);
}

const DelOperation=async(key)=>{
    await fetch(`https://deleteapi.pk6361439.workers.dev?key=${key}`,{
        method:'DELETE',
       
    }).then(async(res)=>{
        console.log('hello del operation performed')
        alert('Product deleted Please refresh the page for updated list')
    })

}
    return(
        <>
        <form className="form">
            <div className="form-group">
            <label for="id"><h4>Enter Product Id</h4></label>
    <input type="text" className="form-control" id="id" placeholder="ex-123 or abc123" name="ProductId" value={data.ProductId} onChange={getData}/>
    <label for="ProductName"><h4>Enter Product Name</h4></label>
    <input type="text" className="form-control" id="ProductName" placeholder="ex-macbook Air" name="ProductName" value={data.ProductName} onChange={getData} />
    <label for="Price"><h4>Enter Product Price</h4></label>
    <input type="text" className="form-control" id="Price" placeholder="ex-Rs 12000" name="Productprice" value={data.Productprice} onChange={getData}/>
    <label for="image"><h4>Select Product photo</h4></label>
    <input type="file" className="form-control-file" id="image" onChange={e => filesHandler(e)}></input>
    <button type="button" className="btn btn-primary" onClick={dataSubmit}>Add/Update</button>
    {/* <button type="button" className="btn btn-primary" onClick={imageSubmit}>Upload</button> */}
  </div>
  
        </form>
        <div className="flex">
    {products.map((data)=>{
        return(
            <div className="set">
            <div className="card" Style="width: 18rem; height: 27rem">
       <img className="card-img-top" src={data.ImgUrl} alt="Card image cap"  Style="width: 18rem; height: 15rem"/>
       <div className="card-body">
       <h5 className="card-title">ID : {data.id}</h5>
       <h6 className="card-title">Product Name : {data.Name}</h6>
       <h6 className="card-title">Product Price : {data.Price}</h6>
       <button className="btn btn-primary" onClick={() => DelOperation(data.id)}>delete</button>
       
  </div>
</div>
            </div>
        )
    })}
    </div>
        </>
    )
}
export default UserUI