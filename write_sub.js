
const fs = require('fs')
const config = require('./config.json')
const {exec, execSync} = require('child_process')

let vid = config.video.video_name;
let def = `Dialogue: 0,(0:00:00.00),(9:99:99.99),Default,,0,0,0,,`
let fps = config.video.fps;
let files = []
let colf = `{\\c&HRRRRRR&}`

console.log("Deleting old files")
fs.readdirSync("frames").forEach((s,i)=>{
  fs.unlinkSync("frames/"+s)
})
fs.readdirSync("frames_converted").forEach((s,i)=>{
  fs.unlinkSync("frames_converted/"+s)
})


console.log("Extracting frames.")
execSync(`ffmpeg -i ${vid} -r ${fps} frames/$filename%04d.jpg`)

console.log("Converting frames.")
fs.readdirSync("frames").forEach((s,i)=>{
    execSync(`jp2a --colors --color-depth=24 --chars=██ --width=${config.video.width} --height=${config.video.height} frames/` + s + " > frames_converted/" + s + ".txt")
})


fs.readdirSync("frames_converted").map((x) => {
    return Number(x.replace(".jpg.txt", ""))
})

.sort(function(a, b) {
    return a - b;
  })
  
 .forEach((s,i)=>{
    files[i] = fs.readFileSync("frames_converted/"+(s.toString()).padStart(4, '0')+".jpg.txt");
})

fs.writeFileSync("new.ass", fs.readFileSync("template.ass").toString()
.replace("$FONT_NAME", config.font.name)
.replace("$FONT_SIZE", config.font.size))

console.log("Writing ASS file.")
for(i in files){

    let s = i/fps;
    let s2 = (Number(i)+1)/fps;
    if(s<config.start_at) continue;
    console.log([s,s2].join())
    fs.appendFileSync("new.ass", def
    .replace("(0:00:00.00)", `0:${Math.floor(s/60).toString().padStart(2, "0")}:${(s%60).toFixed(2).replace(/([0-9]{1,2})(?=\.[0-9]{1,2})/, (a,b) => {return a.replace(/[0-9]{1,2}/, b.padStart(2, "0"))})}`)
    .replace("(9:99:99.99)", `0:${Math.floor(s2/60).toString().padStart(2, "0")}:${(s2%60).toFixed(2).replace(/([0-9]{1,2})(?=\.[0-9]{1,2})/, (a,b) => {return a.replace(/[0-9]{1,2}/, b.padStart(2, "0"))})}`) 
    + `${files[i].toString().replace(/\n/g, "\\N").replace(/\[0m/g, "").replace(/\[38;2;([0-9]{1,});([0-9]{1,});([0-9]{1,})m/g, (a,b,c,d,e,f) => {return colf.replace("RRRRRR", (Number(d).toString(16).padStart(2, "0").toUpperCase()+Number(c).toString(16).padStart(2, "0").toUpperCase()+Number(b).toString(16).padStart(2, "0").toUpperCase()))})}\n`)
}
console.log("\n\nDONE.\n\n")