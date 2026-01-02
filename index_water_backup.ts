import "frida-il2cpp-bridge";
console.log("Rebuilded")

//参考 https://blog.csdn.net/weixin_44292683/article/details/132125663

// Il2Cpp.perform(() => {
//     // 以默认文件名保存在默认路径 /<default_path>/<default_name>.cs
//     Il2Cpp.dump();

// });

// Il2Cpp.perform(() => {

//     Il2Cpp.dump().fileName("dump.cs").classes().build();        

// });

//ok
// Il2Cpp.perform(() => {

//     console.log(Unity.version);

// });

//ok frida -U -f com.Highscoregames.Drawrocket -l hook.js 对于Rocket Punch!这个app是可以的
// Il2Cpp.perform(()=>{
//     console.log(Il2Cpp.unityVersion);
//     Il2Cpp.trace()
//     .assemblies(Il2Cpp.domain.assembly("Assembly-CSharp"))
//     .and()
//     .attach();
// });


// Il2Cpp.perform(() => {
//     const SecurityStreams = Il2Cpp.domain.assembly("Unity.ResourceManager").image.class("SecurityStreams");

//     Il2Cpp.trace(true).classes(SecurityStreams).and().attach();
// });

// Il2Cpp.perform(() => {
//         // 获取Assembly-CSharp.dll
//     const Assembly = Il2Cpp.domain.assembly("ScriptsFramework.Common").image
//     // 获取CarSelector类
//     const TextEncryptUtil = Assembly.class("TextEncryptUtil")
//     // 获取CarSelector下的IsCarUnlocked方法
//     // const FGNACANOIEC = TextEncryptUtil.method("FGNACANOIEC") 

//         Il2Cpp.trace(true)
//     .classes(TextEncryptUtil)
//     .and()
//     .attach()
// });

// Il2Cpp.perform(() => {
//     const Equals = Il2Cpp.corlib.class("System.String").method("Equals");

//     Il2Cpp.trace().methods(Equals).and().attach();

//     // I know, this is verbose
// });

// Il2Cpp.perform(() => {
//     const SystemString = Il2Cpp.corlib.class("System.String");

//     // it traces method calls and returns
//     Il2Cpp.trace()
//         .classes(SystemString)
//         .filterMethods(method => method.isStatic && method.returnType.equals(SystemString.type) && !method.isExternal)
//         .and()
//         .attach();

//     // detailed trace, it traces method calls and returns and it reports every parameter
//     Il2Cpp.trace(true)
//         .assemblies(Il2Cpp.corlib.assembly)
//         .filterClasses(klass => klass.namespace == "System")
//         .filterParameters(param => param.type.equals(SystemString) && param.name == "msg")
//         .and()
//         .assemblies(Il2Cpp.corlib.assembly)
//         .filterMethods(method => method.name.toLowerCase().includes("begin"))
//         .and()
//         .attach();
// });


//ok
// [Mi 10::water.sort.color.puzzle.offline.games ]-> IL2CPP initialized
// ✅ Found LogScroller class:
//    - Name: LogScroller
//    - Namespace:
//    - Type: LogScroller
//    - Address: 0x7a10642d10
//    - Instance Size: 64
// 📋 Methods in LogScroller:
//    - ClearLogs @ 0x7a54a8fabc
//    - Log @ 0x7a54a8fe00
//    - .ctor @ 0x7a54a900a0
// 📋 Fields in LogScroller:
//    - _content (offset: 32)
//    - texts (offset: 40)
//    - PDPJIFPIOHD (offset: 48)
//    - KBGLDJGAJNM (offset: 56)
//  Il2Cpp.perform(() => {
//         console.log("IL2CPP initialized");

//         // Find the LogScroller class
//         const assembly = Il2Cpp.domain.assembly("Assembly-CSharp");
//         if (!assembly) {
//             console.log("❌ Assembly-CSharp not found");
//             return;
//         }

//         const logScrollerClass = assembly.image.class("LogScroller");
//         if (!logScrollerClass) {
//             console.log("❌ LogScroller class not found in Assembly-CSharp");
//             // List all classes in Assembly-CSharp to see what's available
//             console.log("Available classes in Assembly-CSharp:");
//             assembly.image.classes.forEach(cls => {
//                 console.log("  - " + cls.name);
//             });
//             return;
//         }

//         console.log("✅ Found LogScroller class:");
//         console.log("   - Name: " + logScrollerClass.name);
//         console.log("   - Namespace: " + logScrollerClass.namespace);
//         console.log("   - Type: " + logScrollerClass.type);
//         console.log("   - Address: " + logScrollerClass.handle);
//         // console.log("   - Static Size: " + logScrollerClass.staticSize);
//         console.log("   - Instance Size: " + logScrollerClass.instanceSize);

//         // Print all methods in the class
//         console.log("📋 Methods in LogScroller:");
//         logScrollerClass.methods.forEach(method => {
//             console.log("   - " + method.name + " @ " + method.virtualAddress);
//         });

//         // Print all fields in the class
//         console.log("📋 Fields in LogScroller:");
//         logScrollerClass.fields.forEach(field => {
//             console.log("   - " + field.name + " (offset: " + field.offset + ")");
//         });
// });

//ok
// Il2Cpp.perform(() => {
//         console.log("IL2CPP initialized");

//         // Find the LogScroller class
//         const assembly = Il2Cpp.domain.assembly("ScriptsFramework.Common");
//         if (!assembly) {
//             console.log("❌ ScriptsFramework.Common not found");
//             return;
//         }
//         else
//         {
//             console.log("ScriptsFramework.Common found");
//         }

//         // Get all static classes
//         const staticClasses = [];
//         const allClasses = [];

//         assembly.image.classes.forEach(cls => {
//             allClasses.push(cls);
//             if (cls.isStatic) {
//                 console.log(`\n📊 cls.name: ${cls.name}`);
//                 staticClasses.push(cls);
//             }
//         });

//         console.log(`\n📊 Statistics:`);
//         console.log(`   - Total classes: ${allClasses.length}`);
//         console.log(`   - Static classes: ${staticClasses.length}`);
//         console.log(`   - Instance classes: ${allClasses.length - staticClasses.length}`);

//         // Output all static classes with details
//         console.log(`\n🎯 STATIC CLASSES in ScriptsFramework.Common:`);
//         console.log("=" .repeat(80));

//         staticClasses.forEach((cls, index) => {
//             console.log(`\n${index + 1}. ${cls.name}`);
//             console.log(`   📍 Namespace: ${cls.namespace || "global"}`);
//             console.log(`   📍 Class Handle: ${cls.handle}`);
//             console.log(`   📍 Type: ${cls.type}`);
//             console.log(`   📍 Static Size: ${cls.staticSize}`);
//             console.log(`   📍 Instance Size: ${cls.instanceSize}`);
//             console.log(`   📍 Parent: ${cls.parent ? cls.parent.name : "None"}`);

//             // Count methods
//             const staticMethods = cls.methods.filter(m => m.isStatic);
//             const instanceMethods = cls.methods.filter(m => !m.isStatic);

//             console.log(`   📍 Methods: ${staticMethods.length} static, ${instanceMethods.length} instance`);

//             // Show static methods
//             if (staticMethods.length > 0) {
//                 console.log(`   🔧 Static Methods:`);
//                 staticMethods.forEach(method => {
//                     console.log(`        - ${method.name} @ ${method.virtualAddress}`);
//                 });
//             }

//             // Show static fields
//             const staticFields = cls.fields.filter(f => f.isStatic);
//             if (staticFields.length > 0) {
//                 console.log(`   🗂️  Static Fields:`);
//                 staticFields.forEach(field => {
//                     console.log(`        - ${field.name} (${field.type.name}) - Offset: ${field.offset}`);
//                 });
//             }

//             console.log(`   ──────────────────────────────────────────`);
//         });

//     });


//ok 
// [Mi 10::water.sort.color.puzzle.offline.games ]-> ✅ Found TextEncryptUtil in ScriptsFramework.Common
// 📋 Static Methods: 8
// 🔧 LHNGCODGGNG @ 0x7a3c0a25fc
// 🔧 MEFLPEIBNLB @ 0x7a3c0a2688
// 🔧 LHHIMCAIFDM @ 0x7a3c0a2720
// 🔧 FOMCKJNHKFN @ 0x7a3c0a268c
// 🔧 MKLNCANLLLL @ 0x7a3c0a286c
// 🔧 FGNACANOIEC @ 0x7a3c0a2930
// 🔧 LHHIMCAIFDM @ 0x7a3c0a2914
// 🔧 FJGPIPBINEK @ 0x7a3c0a3020    
// Il2Cpp.perform(() => {
//     // Convert to arrays to avoid type issues
//     const assemblies = Array.from(Il2Cpp.domain.assemblies);

//     for (const assembly of assemblies) {
//         if (!assembly || !assembly.image) continue;

//         const classes = Array.from(assembly.image.classes);

//         for (const cls of classes) {
//             if (!cls) continue;

//             // Use string comparison to avoid type issues
//             if (String(cls.name) === "TextEncryptUtil") {
//                 console.log(`✅ Found TextEncryptUtil in ${assembly.name}`);

//                 const methods = Array.from(cls.methods || []);
//                 const staticMethods = methods.filter(m => m && m.isStatic);

//                 console.log(`📋 Static Methods: ${staticMethods.length}`);

//                 for (const method of staticMethods) {
//                     if (!method || !method.virtualAddress) continue;

//                     const methodName = String(method.name);
//                     console.log(`🔧 ${methodName} @ ${method.virtualAddress}`);

//                     Interceptor.attach(method.virtualAddress, {
//                         onEnter: function (args) {
//                             console.log(`📢 ${methodName} called`);
//                         }
//                     });
//                 }
//                 return; // Exit after finding the class
//             }
//         }
//     }

//     console.log("❌ TextEncryptUtil not found");
// });

//ok 开启下一关的时候会调用
// [Mi 10::water.sort.color.puzzle.offline.games ]-> 🚀 快速 Hook TextEncryptUtil 所有方法
// ✅ 已快速 Hook 8 个方法
// 🎮 开始监控 TextEncryptUtil 方法调用...
// 📞 FGNACANOIEC()
// 📞 FJGPIPBINEK()
// 📞 MEFLPEIBNLB()
// 📞 FOMCKJNHKFN()
// 📞 LHNGCODGGNG()
//    ↪ LHNGCODGGNG → 0x7a73548a80
//    ↪ MEFLPEIBNLB → 0x7a73548a80
//    ↪ FOMCKJNHKFN → 0x7a73548a80
// 📞 LHHIMCAIFDM()
//    ↪ LHHIMCAIFDM → 0x7a73548a20
//    ↪ FJGPIPBINEK → 0x7a73548a20
// 📞 MKLNCANLLLL()
// 📞 MEFLPEIBNLB()
// 📞 FOMCKJNHKFN()
// 📞 LHNGCODGGNG()
//    ↪ LHNGCODGGNG → 0x7a73548960
//    ↪ MEFLPEIBNLB → 0x7a73548960
//    ↪ FOMCKJNHKFN → 0x7a73548960
// 📞 LHHIMCAIFDM()
//    ↪ LHHIMCAIFDM → 0x78f9d6b900
//    ↪ MKLNCANLLLL → 0x78f9d6b900
//    ↪ FGNACANOIEC → 0x7a73563000
// Il2Cpp.perform(() => {
//     // 快速查找 TextEncryptUtil
//     let targetClass = null;
//     const assemblies = Il2Cpp.domain.assemblies;

//     assemblyLoop:
//     for (let i = 0; i < assemblies.length; i++) {
//         const classes = assemblies[i].image.classes;
//         for (let j = 0; j < classes.length; j++) {
//             if (classes[j].name === "TextEncryptUtil") {
//                 targetClass = classes[j];
//                 break assemblyLoop;
//             }
//         }
//     }

//     if (!targetClass) {
//         console.log("TextEncryptUtil 未找到");
//         return;
//     }

//     console.log("🚀 快速 Hook TextEncryptUtil 所有方法");

//     const methods = targetClass.methods;
//     let hookCount = 0;

//     for (let k = 0; k < methods.length; k++) {
//         const method = methods[k];

//         if (method.virtualAddress) {
//             const methodName = method.name;

//             Interceptor.attach(method.virtualAddress, {
//                 onEnter: function () {
//                     console.log(`📞 ${methodName}()`);
//                 },
//                 onLeave: function (retval) {
//                     console.log(`   ↪ ${methodName} → ${retval}`);
//                 }
//             });

//             hookCount++;
//         }
//     }

//     console.log(`✅ 已快速 Hook ${hookCount} 个方法`);
//     console.log("🎮 开始监控 TextEncryptUtil 方法调用...");
// });

//ok
function getInfo() {

    console.log("[+] Debug: Exploring TextEncryptUtil class structure...");

    const assembly = Il2Cpp.domain.assembly("ScriptsFramework.Common");
    const TextEncryptUtil = assembly.image.class("Common.TextEncryptUtil.TextEncryptUtil");
    // [+] Debug: Exploring TextEncryptUtil class structure...

    // [+] Class Info:
    //    Name: TextEncryptUtil
    //    Namespace: Common.TextEncryptUtil

    // [+] Methods (8):

    //    1. LHNGCODGGNG
    //       - Virtual Address: 0x7a3d2a65fc
    //       - Parameters: 1
    //       - Return Type: System.String
    //       - Flags: has-address, has-params, has-return
    //         Param[0]: System.String LAAEHLPPHCP

    //    2. MEFLPEIBNLB
    //       - Virtual Address: 0x7a3d2a6688
    //       - Parameters: 0
    //       - Return Type: System.String
    //       - Flags: has-address, has-params, has-return

    //    3. LHHIMCAIFDM
    //       - Virtual Address: 0x7a3d2a6720
    //       - Parameters: 2
    //       - Return Type: System.String
    //       - Flags: has-address, has-params, has-return
    //         Param[0]: System.String CJCIBAAEHIM
    //         Param[1]: System.String NDEBPLHPOAJ

    //    4. FOMCKJNHKFN
    //       - Virtual Address: 0x7a3d2a668c
    //       - Parameters: 0
    //       - Return Type: System.String
    //       - Flags: has-address, has-params, has-return

    //    5. MKLNCANLLLL
    //       - Virtual Address: 0x7a3d2a686c
    //       - Parameters: 0
    //       - Return Type: System.String
    //       - Flags: has-address, has-params, has-return

    //    6. FGNACANOIEC
    //       - Virtual Address: 0x7a3d2a6930
    //       - Parameters: 1
    //       - Return Type: System.String
    //       - Flags: has-address, has-params, has-return
    //         Param[0]: System.String HACPDJNBPKI

    //    7. LHHIMCAIFDM
    //       - Virtual Address: 0x7a3d2a6914
    //       - Parameters: 1
    //       - Return Type: System.String
    //       - Flags: has-address, has-params, has-return
    //         Param[0]: System.String LAAEHLPPHCP

    //    8. FJGPIPBINEK
    //       - Virtual Address: 0x7a3d2a7020
    //       - Parameters: 0
    //       - Return Type: System.String
    //       - Flags: has-address, has-params, has-return

    // [+] Fields (0):
    console.log(`\n[+] Class Info:`);
    console.log(`   Name: ${TextEncryptUtil.name}`);
    console.log(`   Namespace: ${TextEncryptUtil.namespace}`);

    console.log(`\n[+] Methods (${TextEncryptUtil.methods.length}):`);
    TextEncryptUtil.methods.forEach((method, index) => {
        console.log(`\n   ${index + 1}. ${method.name}`);
        console.log(`      - Virtual Address: 0x${method.virtualAddress.toString(16)}`);
        console.log(`      - Parameters: ${method.parameters.length}`);
        console.log(`      - Return Type: ${method.returnType.name}`);

        // Use correct API - check flags instead of direct properties
        const flags = getMethodFlags(method);
        console.log(`      - Flags: ${flags}`);

        method.parameters.forEach((param, paramIndex) => {
            console.log(`        Param[${paramIndex}]: ${param.type.name} ${param.name || 'unnamed'}`);
        });
    });

    console.log(`\n[+] Fields (${TextEncryptUtil.fields.length}):`);
    TextEncryptUtil.fields.forEach((field, index) => {
        console.log(`   ${index + 1}. ${field.name} (${field.type.name})`);
    });
}

// Helper function to get method flags
function getMethodFlags(method: any) {
    const flags = [];
    try {
        // Try to access method information through different means
        if (method.virtualAddress) flags.push('has-address');
        if (method.parameters) flags.push('has-params');
        if (method.returnType) flags.push('has-return');
    } catch (e) {
        // Ignore errors
    }
    return flags.join(', ');
}

//ok
function getInfo1() {
    // await Il2Cpp.initialize();
    const assemblies = Il2Cpp.domain.assemblies;
    //......
    // assembly: Mono.Security
    // assembly: DOTween
    // assembly: Unity.LevelPlay
    // assembly: ScriptsFramework.Common
    // assembly: UnityEngine.AndroidJNIModule
    // assembly: Assembly-CSharp
    // assembly: UnityEngine
    // assembly: Coffee.SoftMaskForUGUI
    // assembly: ScriptsSDK
    // assembly: ScriptsFramework.CommonTools
    // assembly: ScriptsFramework.UI

    // assembly: UnityEngine.TextCoreFontEngineModule
    // assembly: Firebase.Platform
    // assembly: UnityEngine.AnimationModule
    // assembly: UnityEngine.UIModule
    // assembly: UnityEngine.InputLegacyModule
    // assembly: UnityEngine.TextRenderingModule
    // assembly: UnityEngine.UnityAnalyticsModule
    // assembly: ScriptsFramework.Localization
    // assembly: Google.Play.Common
    // assembly: UnityEngine.AudioModule
    // assembly: UnityEngine.AssetBundleModule
    // assembly: UnityEngine.UnityWebRequestWWWModule
    // assembly: UnityEngine.JSONSerializeModule
    // assembly: UnityEngine.SharedInternalsModule
    // assembly: UnityEngine.SpriteMaskModule
    // assembly: UnityEngine.UnityWebRequestAssetBundleModule
    // assembly: UnityEngine.UnityWebRequestTextureModule
    //.......
    // assembly: __Generated
    for (let i = 0; i < assemblies.length; i++) {
        const assembly = assemblies[i];
        // console.log(`assembly: ${assembly.name}`);
        if (assembly.name === "ScriptsFramework.Common") {
            const classes = assembly.image.classes;
            for (let j = 0; j < classes.length; j++) {
                // class.name: <Module>
                // class.name: Enumerator
                // class.name: Deque`1
                // class.name: GameVersionSettings
                // class.name: IJsonWrapper
                // class.name: NKONOKBEJLO
                // class.name: NetworkTimeSync
                // class.name: BlockInputOverTimeDetect
                // class.name: DeviceParamUtil
                // class.name: CKGHOOCDGMA
                // class.name: AHAAIOJPDGJ
                // class.name: HttpTool
                //........
                // class.name: AENEBJBJMFM
                // class.name: LOKJNKEGLNO
                // class.name: HJCNPIEPNKA
                // class.name: TimeManager
                // class.name: NBFEDFAOCJA
                // class.name: DeviceParam
                // class.name: EFAKJBFPFNP
                // class.name: IBEFAIFCLFM
                // class.name: GBOPEHAADIE
                // class.name: DateTimeTool
                // class.name: LFUWeightCache`2
                // class.name: <>c
                // class.name: MgrADID
                // class.name: DoOnceQueueAction
                // class.name: TextEncryptUtil  =============================================================
                //......
                // class.name: HttpAction
                // class.name: JsonToken
                // class.name: JsonType
                // class.name: BtnClick
            }

        }
    }

}

//ok
// [Mi 10::water.sort.color.puzzle.offline.games ]-> [+] Setting up TextEncryptUtil hooks...
// [+] Found FJGPIPBINEK at 0x7a54ca8020
// [+] Successfully hooked FJGPIPBINEK at 0x7a54ca8020
// [+] Found MKLNCANLLLL at 0x7a54ca786c
// [+] Successfully hooked MKLNCANLLLL at 0x7a54ca786c
// [+] Found FGNACANOIEC at 0x7a54ca7930
// [+] Successfully hooked FGNACANOIEC at 0x7a54ca7930
// [+] Found LHHIMCAIFDM at 0x7a54ca7720
// [+] Successfully hooked LHHIMCAIFDM at 0x7a54ca7720
// [+] Found LHNGCODGGNG at 0x7a54ca75fc
// [+] Successfully hooked LHNGCODGGNG at 0x7a54ca75fc
//-------------------------
//有新关卡时
// [📞 FGNACANOIEC Called]
//    Address: 0x7a54ca7930
//    Thread ID: 31217
//    Context: [object Object]

// [📞 FJGPIPBINEK Called]
//    Address: 0x7a54ca8020
//    Thread ID: 31217
//    Context: [object Object]

// [📞 LHNGCODGGNG Called]
//    Address: 0x7a54ca75fc
//    Thread ID: 31217
//    Context: [object Object]
// [✅ LHNGCODGGNG Returning]

// [📞 LHHIMCAIFDM Called]
//    Address: 0x7a54ca7720
//    Thread ID: 31217
//    Context: [object Object]
// [✅ LHHIMCAIFDM Returning]
// [✅ FJGPIPBINEK Returning]
//    Return Value: 岰ဤz
//    Length: 3

// [📞 MKLNCANLLLL Called]
//    Address: 0x7a54ca786c
//    Thread ID: 31217
//    Context: [object Object]

// [📞 LHNGCODGGNG Called]
//    Address: 0x7a54ca75fc
//    Thread ID: 31217
//    Context: [object Object]
// [✅ LHNGCODGGNG Returning]

// [📞 LHHIMCAIFDM Called]
//    Address: 0x7a54ca7720
//    Thread ID: 31217
//    Context: [object Object]
// [✅ LHHIMCAIFDM Returning]
// [✅ MKLNCANLLLL Returning]
//    Return Value: 岰ဤz
//    Length: 3
// [✅ FGNACANOIEC Returning]
async function getKeyIV_All() {

    console.log("[+] Setting up TextEncryptUtil hooks...");

    const assembly = Il2Cpp.domain.assembly("ScriptsFramework.Common");
    const TextEncryptUtil = assembly.image.class("Common.TextEncryptUtil.TextEncryptUtil");

    // Hook using virtual address approach
    await hookByVirtualAddress(TextEncryptUtil);
}

async function hookByVirtualAddress(TextEncryptUtil: any) {
    // Find methods by name and hook using their virtual addresses
    const targetMethods = [
        "FJGPIPBINEK", // Key generation
        "MKLNCANLLLL", // IV generation
        "FGNACANOIEC", // Decryption
        "LHHIMCAIFDM", // Encryption
        "LHNGCODGGNG"  // Another encryption method
    ];

    for (const methodName of targetMethods) {
        try {
            const method = findMethodByName(TextEncryptUtil, methodName);
            if (method) {
                console.log(`[+] Found ${methodName} at 0x${method.virtualAddress.toString(16)}`);
                await hookMethodAtAddress(method, methodName);
            } else {
                console.log(`[!] Method ${methodName} not found`);
            }
        } catch (e: any) {
            console.log(`[!] Error with ${methodName}: ${e.message}`);
        }
    }
}

function findMethodByName(klass: any, methodName: string) {
    for (const method of klass.methods) {
        if (method.name === methodName) {
            return method;
        }
    }
    return null;
}

async function hookMethodAtAddress(method: any, methodName: string) {
    try {
        // Use Interceptor.attach for low-level hooking
        const methodAddress = method.virtualAddress;

        Interceptor.attach(methodAddress, {
            onEnter: function (args: any) {
                console.log(`\n[📞 ${methodName} Called]`);
                console.log(`   Address: 0x${methodAddress.toString(16)}`);
                console.log(`   Thread ID: ${this.threadId}`);

                // Log context for debugging
                console.log(`   Context: ${this.context}`);

                console.log("args[0] - MethodInfo*: " + args[0]);

                // Based on your decompiled code, args[1] should be System_String_o* HACPDJNBPKI
                if (args[1] && !args[1].isNull()) {
                    try {
                        const inputString = Il2Cpp.string(args[1]);
                        console.log("args[1] - Input String (HACPDJNBPKI): '" + inputString + "'");
                        console.log("  ↳ String Length: " + inputString.length);
                        console.log("  ↳ Address: " + args[1]);
                    } catch (e) {
                        console.log("args[1] - Could not read as string: " + e);
                        console.log("  ↳ Raw: " + args[1]);
                    }
                } else {
                    console.log("args[1] - NULL or invalid");
                }
            },
            onLeave: function (retval: any) {
                console.log(`[✅ ${methodName} Returning]`);

                // For methods that return strings, try to read the result
                // if (methodName === "FJGPIPBINEK" || methodName === "MKLNCANLLLL") {
                try {
                    // Read the return value (Il2CppString*)
                    const stringPtr = retval;
                    if (!stringPtr.isNull()) {
                        const result = stringPtr.readUtf16String();
                        console.log(`   Return Value retval: ${retval}`);
                        console.log(`   Return Value result: ${result}`);
                        console.log(`   Length: ${result ? result.length : 0}`);
                    } else {
                        console.log(`   Return Value: null`);
                    }
                } catch (e: any) {
                    console.log(`   Error reading return value: ${e.message}`);
                }
                // }
            }
        });

        console.log(`[+] Successfully hooked ${methodName} at 0x${methodAddress.toString(16)}`);

    } catch (e: any) {
        console.log(`[!] Failed to hook ${methodName}: ${e.message}`);
    }
}

/////////////////////////////////////
//ok
// [+] Tracking KEY at 0x7a530b2020
// [+] Tracking IV at 0x7a530b186c

// 📥 Captured KEY:
//    Raw: 岰ဤz
//    Hex: 5cb0 1024 007a

// 📥 Captured IV:
//    Raw: 岰ဤz
//    Hex: 5cb0 1024 007a

// 🎊 COMPLETE AES KEY/IV PAIR FOUND!
// =====================================
// 🔑 KEY: 岰ဤz
// 🔒 IV:  岰ဤz

// For AES Decryption Use:
// Key Bytes: 5c b0 10 24 00 7a
// IV Bytes:  5c b0 10 24 00 7a
async function getKeyIV_new() {

    console.log("[🔑🔒] Capturing AES Key and IV Pair");

    const assembly = Il2Cpp.domain.assembly("ScriptsFramework.Common");
    const TextEncryptUtil = assembly.image.class("Common.TextEncryptUtil.TextEncryptUtil");

    let lastKey: string | null = null;
    let lastIV: string | null = null;

    const keyMethod = findMethod(TextEncryptUtil, "FJGPIPBINEK");
    const ivMethod = findMethod(TextEncryptUtil, "MKLNCANLLLL");

    if (keyMethod) {
        hookWithPairTracking(keyMethod, "KEY", (key: string) => {
            lastKey = key;
            checkForCompletePair(lastKey, lastIV);
        });
    }

    if (ivMethod) {
        hookWithPairTracking(ivMethod, "IV", (iv: string) => {
            lastIV = iv;
            checkForCompletePair(lastKey, lastIV);
        });
    }
}

function findMethod(klass: any, methodName: string): any {
    for (let i = 0; i < klass.methods.length; i++) {
        if (klass.methods[i].name === methodName) {
            return klass.methods[i];
        }
    }
    return null;
}

//[Mi 10::water.sort.color.puzzle.offline.games ]-> [🔑🔒] Capturing AES Key and IV Pair
// [+] Tracking KEY at 0x7a54ea2020
// [+] Tracking IV at 0x7a54ea186c

// 📥 Captured KEY:
//    Raw: 岰$z
//    Hex: 5cb0 0024 007a

// 📥 Captured IV:
//    Raw: 岰$z
//    Hex: 5cb0 0024 007a

// 🎊 COMPLETE AES KEY/IV PAIR FOUND!
// =====================================
// 🔑 KEY: 岰$z
// 🔒 IV:  岰$z

// For AES Decryption Use:
// Key Bytes: 5c b0 00 24 00 7a
// IV Bytes:  5c b0 00 24 00 7a

// [Mi 10::water.sort.color.puzzle.offline.games ]-> [🔑🔒] Capturing AES Key and IV Pair
// [+] Tracking KEY at 0x7a582ab020
// [+] Tracking IV at 0x7a582aa86c

// 📥 Captured KEY:                                    AggregateError
//    Raw: 岰ဤz retval:0x7901551c00                    ApiResolver
//    Hex: 5cb0 1024 007a                              Arm64Relocator
//                                                     Arm64Writer
// 📥 Captured IV:                                     Array
//    Raw: 岰ဤz retval:0x7901513180                    ArrayBuffer
//    Hex: 5cb0 1024 007a                              Backtracer

// 🎊 COMPLETE AES KEY/IV PAIR FOUND!
// =====================================
// 🔑 KEY: 岰ဤz
// 🔒 IV:  岰ဤz

// For AES Decryption Use:
// Key Bytes: 5c b0 10 24 00 7a
// IV Bytes:  5c b0 10 24 00 7a
function hookWithPairTracking(method: any, type: string, callback: (result: string) => void) {
    const address = method.virtualAddress;

    console.log("[+] Tracking " + type + " at 0x" + address.toString(16));

    Interceptor.attach(address, {
        onLeave: function (retval: any) {
            if (!retval.isNull()) {
                try {
                    const result = retval.readUtf16String();
                    if (result) {
                        console.log("");
                        console.log("📥 Captured " + type + ":");
                        console.log("   Raw: " + result + " retval:" + retval);//Raw: 岰$z Hex: 5cb0 0024 007a

                        // Convert to hex representation
                        let hex = "";
                        for (let i = 0; i < result.length; i++) {
                            hex += result.charCodeAt(i).toString(16).padStart(4, '0') + " ";
                        }
                        console.log("   Hex: " + hex.trim());

                        callback(result);
                    }

                } catch (e: any) {
                    console.log("Error reading " + type + ": " + e.message);
                }
            }
        }
    });
}

function checkForCompletePair(key: string | null, iv: string | null) {
    if (key && iv) {
        console.log("");
        console.log("🎊 COMPLETE AES KEY/IV PAIR FOUND!");
        console.log("=====================================");
        console.log("🔑 KEY: " + key);
        console.log("🔒 IV:  " + iv);
        console.log("");

        // Convert both to proper format for crypto use
        console.log("For AES Decryption Use:");
        console.log("Key Bytes: " + stringToBytes(key).join(' '));
        console.log("IV Bytes:  " + stringToBytes(iv).join(' '));
        console.log("=====================================");
        console.log("");

        // Reset for next pair
        if ((global as any).capturedCrypto) {
            (global as any).capturedCrypto.completePair = { key, iv };
        }
    }
}

function stringToBytes(str: string): string[] {
    const bytes: number[] = [];
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        // Split UTF-16 into two bytes
        bytes.push((code >> 8) & 0xFF);
        bytes.push(code & 0xFF);
    }
    return bytes.map(b => b.toString(16).padStart(2, '0'));
}

// Il2Cpp.perform(getInfo).catch(console.error);
// Il2Cpp.perform(getKeyIV_new).catch(console.error);
Il2Cpp.perform(getKeyIV_All).catch(console.error);