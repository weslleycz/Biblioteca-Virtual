const prismaClient = require("../servers/prismaClient");
const { color } = require("console-log-colors");
const { bgRed} = color;
const moment = require("moment");

const upPendency = async () => {
    try {
        const data = await prismaClient.loan.findMany({
            where:{
                endDate:{
                    lte:moment().format()
                },
            },
            include:{
                user:{
                    select:{
                        name:true,
                        email:true,
                        id:true,
                        telephone:true, 
                    },
                }
            }
        })

      data.map(async(userDeta)=>{
            const user = await prismaClient.user.update({
                where:{
                    id:userDeta.userId
                },
                data:{
                    pendency:true,
                }
            })
            await prismaClient.loan.update({
                where:{
                    id:userDeta.userId
                },
                data:{
                    statusLoan:"Pendente"
                }
            })
        })
    } catch (error) {
        console.log(bgRed(error));
    }
}

module.exports={upPendency}