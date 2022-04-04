const mongoose = require('mongoose'); 
const Data = require("../models/data")
const transporter = require("../email/sendmail");

exports.getData=async(req,res,next)=>{


try { 
    const data=await Data.find();
    if(data)
    return res.status(200).json({
        message: "Success",
        data: data
    })
    
} catch (error) {
    return res.status(200).json({
        message : "Failed"
    })
} 
}

exports.createData=async(req,res,next)=>{

 
 
 const name = req.body.name.toString();
 const email = req.body.email.toString();
 const phone = req.body.phone.toString();
 const hobbies= req.body.hobbies.toString();
    try { 
        const data=await  Data.create({
            
            name : name ,
            phone:phone,
            email: email,
            hobbies:hobbies
        })
        

        if(data)
        return res.status(200).json({
            message: "Success",
            data: data
        })
        
    } catch (error) { 
        console.log(error)
        return res.status(200).json({
            message : "Failed ",
            error: error
        })
    }
}
    exports.updateData=async(req,res,next)=>{
        const {name,phone,email,hobbies} = req.body;
        const id = req.params.id.toString();  
        console.log(id)
        try { 
            const data=await Data.findByIdAndUpdate(id,{
               
                name : name ,
                phone:phone,
                email: email,
                hobbies:hobbies
            
            });
            if(data)
            return res.status(200).json({
                message: "Success",
                data: data
            }) 
            else {
                return res.status(203).json({
                    message: "Id does not exists",
                   
                }) 
            }
            
        } catch (error) {
            return res.status(200).json({
                message : "Failed"
            })
        }
    }
        exports.deleteData=async(req,res,next)=>{
            
            const id = req.params.id.toString();
   
            try { 
                const data=await Data.findByIdAndDelete(id);
                if(data)
                return res.status(200).json({
                    message: "Success",
                  
                }) 
                else {
                    return res.status(200).json({
                        message: "id not found",
                      
                    }) 
                }
                
            } catch (error) {
                return res.status(200).json({
                    message : "Failed"
                })
            }

        }
        exports.sendMail=async(req,res,next)=>{
         
            const data= req.body.dataArr;
              console.log(data)
  
              var arrayItems = "";
              var n;
              for (n in data) {
                arrayItems += "<div>Name Phone Email Hobbies</div> <div><li>"  + data[n].name +" " + data[n].phone + " " + data[n].email + " "+ data[n].hobbies + "</li></div>";
              }
        
                        let mailoptions = {
                            from: "mailer.2334@gmail.com",
                            to: "info@redpositive.in",
                            
                            subject: " Assesment Mail Sent",
                            html: `<h2>Data</h2>
                            <ul>${arrayItems}</ul>`
                                
                        };
        
                       await  transporter.sendMail(mailoptions, (err, data) => {
                            if (err) {
                                console.log("Mail not sent" + err);
                                return res.status(400).json({ 
                                    message:"Failed",
                                    error: "Mail not sent",
                                });
                            } else {
                                console.log("Email sent");
                              return   res.status(200).json({
                                    message: "Success",
                                });
                                
                            }
                        });
                    
       
        }