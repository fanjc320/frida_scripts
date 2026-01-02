import "frida-il2cpp-bridge";
console.log("Rebuilded")


// const il2cpp = require('frida-il2cpp-bridge');

// function traceAllFunc() {
//     try {
//         // 1. 等待IL2CPP引擎初始化完成
//         console.log('[+] 正在等待IL2CPP初始化...');
//         // await Il2Cpp.waitForInitialization();
//         console.log('[√] IL2CPP初始化完成');
        
//         // 2. 获取指定命名空间下的所有类
//         console.log(`[+] 正在查找命名空间: Game.WaterPlay`);
//         const classes = Il2Cpp.domain
//             .assemblies
//             .flatMap(assembly => assembly.image.classes)
//             .filter(cls => cls.namespace === 'Game.WaterPlay');
        
//         if (classes.length === 0) {
//             console.log('[!] 未找到 Game.WaterPlay 命名空间下的类');
//             return;
//         }
        
//         console.log(`[√] 找到 ${classes.length} 个类`);
//         classes.forEach((cls, index) => {
//             console.log(`  [${index + 1}] ${cls.namespace}.${cls.name} (方法数: ${cls.methods.length})`);
//         });
        
//         // 3. 对每个类开启追踪
//         console.log('\n[+] 开始追踪所有函数调用...');
//         console.log('[!] 注意：追踪可能导致游戏卡顿，按 Ctrl+C 停止\n');
        
//         classes.forEach(cls => {
//             // 追踪整个类
//             Il2Cpp.trace(cls);
            
//             // 可选：单独输出每个方法的信息
//             cls.methods.forEach(method => {
//                 console.log(`[追踪已启用] ${cls.namespace}.${cls.name}::${method.name}`);
//             });
//         });
        
//         // 4. 保持脚本运行
//         console.log('\n[√] 追踪已启动，等待函数调用...\n');
//         console.log('='.repeat(50));
        
//     } catch (error) {
//         console.error('[!] 错误:', error.message);
//     }
// }

// function test1(){
//     Il2Cpp.perform(()=>{
//     console.log(Il2Cpp.unityVersion)
//     Il2Cpp.trace()
//     .assemblies(Il2Cpp.domain.assembly("Assembly-CSharp"))
//     .and()
//     .attach();
// });
// }

// async function test2() {
//     await Il2Cpp.initialize();
    
//     // const TestAssembly = Il2Cpp.Domain.reference.assemblies["Test.Assembly"].image;
//     const TestAssembly = Il2Cpp.Domain.reference.assemblies["Test.Assembly"].image;
    
//     TestAssembly.classes.TestClass.methods.testMethod.intercept({
//         onLeave(returnValue) { 
//             const testObject = returnValue.value as Il2Cpp.Object;
//             testObject.fields.testField.value = 100;
//             testObject.methods.newTestMethod.invoke(false, Il2Cpp.String.from("testString"));
//         }
//     });
    
//     TestAssembly.classes.NewTestClass.trace();
// }

// test2().catch(error => console.log(error.stack));

function traceFuncOk(){
    // const namespaceA = Il2Cpp.domain.assembly("Assembly-CSharp").image.namespace("com.unity3d.mediation");
    const classLevelPlay = Il2Cpp.domain.assembly("Unity.LevelPlay.dll").image.class("com.unity3d.mediation.LevelPlay");
    // const classLevel = namespaceA.class("LevelPlay");
    classLevelPlay.methods.forEach(method => {
                console.log(`[追踪已启用] ${classLevelPlay.namespace}.${classLevelPlay.name}::${method.name}`);
            });
}

// const { Il2Cpp } = require('frida-il2cpp-bridge');

// async function test4() {
function traceFuncOk1() {
    // 初始化 il2cpp
    // await Il2Cpp.initialize();
    
    // console.log(`[+] Unity Version: ${Il2Cpp.unityVersion}`);
    // console.log(`[+] Il2Cpp Version: ${Il2Cpp.version}`);
    // console.log(`[+] Domain: ${Il2Cpp.domain}`);
    
    // try {
        // 获取命名空间 A 下的类 B
        // const classB = Il2Cpp.domain.assembly('Assembly-CSharp').image.class('com.unity3d.mediation.LevelPlay');
        const classB = Il2Cpp.domain.assembly('Unity.LevelPlay.dll').image.class('com.unity3d.mediation.LevelPlay');
         
        
        console.log(`[+] Found class: ${classB.name}`);
        
        // 遍历类 B 的所有方法
        const methods = classB.methods;
        console.log(`[+] Found ${methods.length} methods in class B`);

        // classB.methods.forEach(method => {
        //         console.log(`[追踪已启用] ${classB.namespace}.${classB.name}::${method.name}`);
        //     });
        
        // // Hook 所有方法
        methods.forEach((method, index) => {
            // const methodName = method.name;
            // const methodSignature = method.signature;
            
            // console.log(`[${index + 1}] Hooking method: ${methodName}`);
            
            // // Hook 方法
             Interceptor.attach(method.virtualAddress, {
                onEnter: function(args) {
                    // 获取调用栈信息
                    // const stackTrace = Il2Cpp.coroutine.backtrace();
                    
                    console.log(`\n=== 方法调用开始 ===`);
                    console.log(`[时间] ${new Date().toLocaleString()}`);
                    console.log(`[类名] ${classB.name}`);
                    // console.log(`[方法] ${methodName}`);
                    // console.log(`[签名] ${methodSignature}`);
                    console.log(`[调用栈]:`);
                    
                    // // 打印调用栈（限制深度）
                    // for (let i = 0; i < Math.min(stackTrace.length, 5); i++) {
                    //     console.log(`  ${stackTrace[i].toString()}`);
                    // }
                    
                    // 打印参数信息
                    console.log(`[参数个数]: ${args.length}`);
                    for (let i = 0; i < args.length; i++) {
                        try {
                            const argValue = args[i];
                            console.log(`  参数${i}: ${argValue} (类型: ${typeof argValue})`);
                        } catch (e) {
                            console.log(`  参数${i}: <无法读取>`);
                        } 
                    }
                    
                    // // 保存 this 指针（如果有）
                    // if (method.isInstance) {
                    //     console.log(`[this指针]: ${this}`);
                    // }
                },
                onLeave: function(retVal) {
                    // 打印返回值
                    console.log(`[返回值]: ${retVal}`);
                    console.log(`=== 方法调用结束 ===\n`);
                }
            });


        });
        
        console.log(`[+] 成功 Hook 了 ${methods.length} 个方法`);
        
    //} //catch (error) {
    //     console.error(`[-] 错误: ${error.message}`);
    //     console.error(error.stack);
    // }
    
    // // 保持脚本运行
    // Il2Cpp.perform(() => {
    //     console.log('[+] 脚本已加载，等待方法调用...');
    // });
}

function traceFuncOk2(){
    
            // 对CarSelector类进行跟踪，trace(true)时打印参数
    // Il2Cpp.trace(true)
    // .classes(classB)
    // .and()
    // .attach()
 
    // 对Assembly-CSharp.dll 下的类名包含LevelPlay的类进行跟踪
    Il2Cpp.trace(true)
    // .assemblies(Il2Cpp.domain.assembly("Assembly-CSharp"))
    .assemblies(Il2Cpp.domain.assembly("Unity.LevelPlay.dll"))
    .filterClasses(klass=>klass.name.indexOf("LevelPlay")!=-1)
    .and()
    .attach()
}

function test4(){
    
            // 对CarSelector类进行跟踪，trace(true)时打印参数
    // Il2Cpp.trace(true)
    // .classes(classB)
    // .and()
    // .attach()
 
    // 对Assembly-CSharp.dll 下的类名包含LevelPlay的类进行跟踪
    // Il2Cpp.trace(true)
    Il2Cpp.trace()
    .assemblies(Il2Cpp.domain.assembly("Assembly-CSharp"))
    // .filterClasses(klass=>klass.name.indexOf("LevelPlay")!=-1)
    .and()
    .attach();

    //     TestAssembly.classes.TestClass.methods.testMethod.intercept({
    //     onLeave(returnValue) { 
    //         const testObject = returnValue.value as Il2Cpp.Object;
    //         testObject.fields.testField.value = 100;
    //         testObject.methods.newTestMethod.invoke(false, Il2Cpp.String.from("testString"));
    //     }
    // });
}

// Il2Cpp.perform(traceAllFunc).catch(console.error);
// Il2Cpp.perform(traceAllFunc1).catch(console.error);
// Il2Cpp.perform(traceFuncOk).catch(console.error);
Il2Cpp.perform(test4).catch(console.error);