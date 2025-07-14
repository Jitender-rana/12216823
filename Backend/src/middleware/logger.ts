import axios from "axios";

enum logStack{
    frontend = "frontend",
    backend = "backend",


}
enum levelStack{
    debug= "debug",
    info= "info",
    warn= "warn",
    error="error",
    fatal="fatal"
}
enum pkgStack{
    cache="cache",
    controller="controller",
    cron_job="cron_job",
    domain="domain",
    handler="repossitory",
    route="route",
    service="service",
    api="api"
}


export async function logger(stack:logStack,level:levelStack,Pkg:pkgStack,message:string){
    const response=axios.post("http://20.244.56.144/evaluation-service/logs",{
        "stack": stack,
        "level": level,
        "package": Pkg,
        "message": message,


    },{
        headers:{
            //Authorization: `Bearer ${token}`,
        }
    })

}