const button=document.querySelector('#btn');
const colorshow=document.querySelector('#showcolor');
const hexcode=document.querySelector('#hexcode');

button.addEventListener('click',async()=>{

    chrome.storage.sync.get('color',(color)=>{
        console.log(color)
    })
    //receive all information of current tab in array form
    let [tab]=await chrome.tabs.query({active:true,currentWindow:true});
    // console.log(tab);

    chrome.scripting.executeScript({ //it will execute script in current tab(tab.id)
        target:{tabId:tab.id},
        function:pickcolor,   //call function "pickcolor"
        
    },async (colorinjected)=>{
            let [data]=colorinjected
            // console.log(data)
            // console.log(colorinjected)
            if(data.result){
                const color=data.result.sRGBHex;
                colorshow.style.backgroundColor=color
                hexcode.innerHTML=color
            }
    });
});

async function pickcolor(){
    // console.log('pick the color');    
    const eyedropper=new EyeDropper();
    const colorselected=await eyedropper.open();
    return colorselected;
    // console.log(colorselected);

}