// import "frida-il2cpp-bridge";

console.log("Script loaded successfully ..... ");

// 直接查询类的模块信息
function findClassModule(className) {
    let modules = Process.enumerateModules();
    
    for (let module of modules) {
        try {
            // 尝试在模块中查找类
            let result = Module.findBaseAddress(module.name);
            console.log(`baseAddress result ${result}`);
            // 或者枚举所有导出符号
            let exports = Module.enumerateSymbols(module.name);
            for (let exp of exports) {
                console.log(`exp.name ${exp.name}`);
                // console.log(`找到 ${className} 在模块: ${module.name}`);
                if (exp.name.includes(className)) {
                    console.log(`找到 ${className} 在模块: ${module.name}`);
                    console.log(`地址: ${exp.address}`);
                    return module;
                }
            }
        } catch (e) {
            // 忽略错误
        }
    }
    
    console.log(`未找到类 ${className}`);
    return null;
}

// 使用
findClassModule("TextEncryptUtil");


// 重点检查这些常见的自定义程序集
let customAssemblies = [
    "Assembly-CSharp.dll",
    "Assembly-CSharp-firstpass.dll", 
    "ScriptsGame.dll",
    "ScriptsSDK.dll",
    "ScriptsFramework.Common.dll"
];

for (let assem of customAssemblies) {
    let baseAddr = Module.findBaseAddress(assem);
    if (baseAddr) {
        console.log(`检查 ${assem} - 基地址: ${baseAddr}`);
        // 可以进一步检查导出
    }
    else{
        console.log(`no baseAddr`)
    }
}