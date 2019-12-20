

const enc = (element,key,list) => {
    // eslint-disable-next-line
    var list = list || [];
    if(typeof(element)=='object'){
        for (var idx in element)
            enc(element[idx],key?key+'['+idx+']':idx,list);
    } else {
        list.push(key+'='+encodeURIComponent(element));
    }
    return list.join('&');
};

export default enc;