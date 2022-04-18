exports.getSocialMediaNameFromLink = (socialMedia)=>{
    return socialMedia.map(url=>{
        const socialMediaObj = {}
       const domain = new URL(url);
       const name = domain.hostname.replace("www.","").split(".")[0];
       socialMediaObj["name"] = name ;
       socialMediaObj["link"] = url;
       return socialMediaObj
    })
}