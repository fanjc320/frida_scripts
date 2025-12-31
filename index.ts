import "frida-il2cpp-bridge";
console.log("Rebuilded")

async function getKeyIV_All() {

    console.log("[+] Setting up TextEncryptUtil hooks...");

    const assembly = Il2Cpp.domain.assembly("ScriptsFramework.Common");
    const TextEncryptUtil = assembly.image.class("Common.TextEncryptUtil.TextEncryptUtil");

    // Hook using virtual address approach
    await hookByVirtualAddress(TextEncryptUtil);
    // await traceAllMethods(TextEncryptUtil);

    // seeMethodSignature();
    // seeRealParams();
    // invokeEncrypt(TextEncryptUtil);
}

function seeMethodSignature() {
    Il2Cpp.perform(() => {
        const assembly = Il2Cpp.domain.assembly("ScriptsFramework.Common");
        const TextEncryptUtil = assembly.image.class("Common.TextEncryptUtil.TextEncryptUtil");

        // List all methods to find the right one
        console.log("=== All Methods in TextEncryptUtil ===");
        //     Method: LHNGCODGGNG
        //   Parameters: 1
        //     param[0]: System.String
        //   Return Type: System.String
        //   Is Static: true
        //   ---
        // Method: MEFLPEIBNLB
        //   Parameters: 0
        //   Return Type: System.String
        //   Is Static: true
        //   ---
        // Method: LHHIMCAIFDM
        //   Parameters: 2
        //     param[0]: System.String
        //     param[1]: System.String
        //   Return Type: System.String
        //   Is Static: true
        //   ---
        // Method: FOMCKJNHKFN
        //   Parameters: 0
        //   Return Type: System.String
        //   Is Static: true
        //   ---
        // Method: MKLNCANLLLL
        //   Parameters: 0
        //   Return Type: System.String
        //   Is Static: true
        //   ---
        // Method: FGNACANOIEC
        //   Parameters: 1
        //     param[0]: System.String
        //   Return Type: System.String
        //   Is Static: true
        //   ---
        // Method: LHHIMCAIFDM
        //   Parameters: 1
        //     param[0]: System.String
        //   Return Type: System.String
        //   Is Static: true
        //   ---
        // Method: FJGPIPBINEK
        //   Parameters: 0
        //   Return Type: System.String
        //   Is Static: true
        //   ---
        TextEncryptUtil.methods.forEach(method => {
            console.log(`Method: ${method.name}`);
            console.log(`  Parameters: ${method.parameters.length}`);
            method.parameters.forEach((param, index) => {
                console.log(`    param[${index}]: ${param.type.name}`);
            });
            console.log(`  Return Type: ${method.returnType.name}`);
            console.log(`  Is Static: ${method.isStatic}`);
            console.log("  ---");
        });
    });
}

// Found method: LHHIMCAIFDM
// Parameter count: 2
// Is Static: true
// Parameter 0: System.String
// Parameter 1: System.String
// Return type: System.String
function seeRealParams() {
    Il2Cpp.perform(() => {
        const assembly = Il2Cpp.domain.assembly("ScriptsFramework.Common");
        const TextEncryptUtil = assembly.image.class("Common.TextEncryptUtil.TextEncryptUtil");

        // Find the specific method
        const encryptMethod = TextEncryptUtil.method("LHHIMCAIFDM");

        console.log(`Found method: ${encryptMethod.name}`);
        console.log(`Parameter count: ${encryptMethod.parameters.length}`);
        console.log(`Is Static: ${encryptMethod.isStatic}`);

        // Print parameter details
        encryptMethod.parameters.forEach((param, index) => {
            console.log(`Parameter ${index}: ${param.type.name}`);
        });
        console.log(`Return type: ${encryptMethod.returnType.name}`);

        // Hook to see real calls
        Interceptor.attach(encryptMethod.virtualAddress, {
            onEnter: function (args) {
                console.log("\n=== LHHIMCAIFDM Called ===");

                if (!encryptMethod.isStatic) {
                    console.log(`this pointer: ${args[0]}`);
                }

                // Check what's actually being passed
                const startIndex = encryptMethod.isStatic ? 0 : 1;
                for (let i = startIndex; i < startIndex + encryptMethod.parameters.length; i++) {
                    try {
                        if (args[i] && !args[i].isNull()) {
                            try {
                                // Correct way to read Il2Cpp string from pointer
                                const stringObj = new Il2Cpp.String(args[i]);
                                console.log(`arg[${i}]: "${stringObj.content}"`);
                            } catch (e) {
                                // Try reading as C# string
                                try {
                                    const utf16String = args[i].readUtf16String();
                                    if (utf16String) {
                                        console.log(`arg[${i}]: "${utf16String}" (UTF-16)`);
                                    } else {
                                        console.log(`arg[${i}]: ${args[i]} (not a readable string)`);
                                    }
                                } catch (e2) {
                                    console.log(`arg[${i}]: ${args[i]} (pointer)`);
                                }
                            }
                        } else {
                            console.log(`arg[${i}]: NULL`);
                        }
                    } catch (e) {
                        break;
                    }
                }
            },

            onLeave: function (retval: any) {
                console.log(`Return pointer: ${retval}`);
                if (retval && !retval.isNull()) {
                    try {
                        const resultString = new Il2Cpp.String(retval);
                        console.log(`Return as string: "${resultString.content}"`);
                    } catch (e: any) {
                        console.log(`Return is not a string or can't be read: ${e.message}`);
                    }
                }
            }
        });
    });
}

function invokeEncrypt(TextEncryptUtil: any) {
    // const encrypt = TextEncryptUtil.method("LHHIMCAIFDM");
    // Il2Cpp.trace(true).methods(encrypt).and().attach();

    // // encrypt.implementation = function (value: Il2Cpp.String): Il2Cpp.String {
    // //     // value.content = "fjc"; // <--- onEnter
    // //     // <--- onEnter
    // //     // const result = this.method<Il2Cpp.String>("LHHIMCAIFDM").invoke(value);
    // //     const result = this.method("LHHIMCAIFDM").invoke(value);
    // //     // <--- onLeave
    // //     console.log(result); // <--- onLeave
    // //     return result; // <--- onLeave
    // // };

    // const res = encrypt.invoke("abcdefg", "123");
    // console.log("encrypt LHHIMCAIFDM res:", res);
    ////////////////////////////////////////////
    Il2Cpp.perform(() => {
        const encryptMethod = TextEncryptUtil.method("LHHIMCAIFDM");
        const decryptMethod = TextEncryptUtil.method("FGNACANOIEC");
        const toInvokeMethod = decryptMethod//Testing as static method...
// 1 param failed: access violation accessing 0x58

//         === Method Info ===
// Name: LHHIMCAIFDM
// Is Static: true
// Parameter count: 2
// Return type: System.String
// Parameter 0: System.String
// Parameter 1: System.String

// === Testing Invocation ===
// Testing as static method...
// 2 params failed: abort was called
        console.log("=== Method Info ===");
        console.log(`Name: ${toInvokeMethod.name}`);
        console.log(`Is Static: ${toInvokeMethod.isStatic}`);
        console.log(`Parameter count: ${toInvokeMethod.parameters.length}`);
        console.log(`Return type: ${toInvokeMethod.returnType.name}`);

        toInvokeMethod.parameters.forEach((param: any, index: any) => {
            console.log(`Parameter ${index}: ${param.type.name}`);
        });

        // Test different invocation patterns
        console.log("\n=== Testing Invocation ===");

        if (toInvokeMethod.isStatic) {
            console.log("Testing as static method...");

            // Create Il2Cpp string objects properly
            const testString1 = Il2Cpp.string("abcdefgaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            const testString2 = Il2Cpp.string("123");

            if (toInvokeMethod.parameters.length === 1) {
                try {
                    const result = toInvokeMethod.invoke(testString1);
                    if (result && !result.isNull()) {
                        const resultString = new Il2Cpp.String(result);
                        console.log("1 param result:", resultString.content);
                    } else {
                        console.log("1 param result: NULL");
                    }
                } catch (e: any) {
                    console.log("1 param failed:", e.message);
                }
            } else if (toInvokeMethod.parameters.length === 2) {
                try {
                    const result = toInvokeMethod.invoke(testString1, testString2);
                    if (result && !result.isNull()) {
                        const resultString = new Il2Cpp.String(result);
                        console.log("2 params result:", resultString.content);
                    } else {
                        console.log("2 params result: NULL");
                    }
                } catch (e: any) {
                    console.log("2 params failed:", e.message);
                }
            }
        } else {
            console.log("Testing as instance method...");

            const instance = TextEncryptUtil.alloc();
            const testString1 = Il2Cpp.string("abcdefg");
            const testString2 = Il2Cpp.string("123");

            if (toInvokeMethod.parameters.length === 1) {
                try {
                    const result = toInvokeMethod.invoke(instance, testString1);
                    if (result && !result.isNull()) {
                        const resultString = new Il2Cpp.String(result);
                        console.log("1 param result:", resultString.content);
                    } else {
                        console.log("1 param result: NULL");
                    }
                } catch (e: any) {
                    console.log("1 param failed:", e.message);
                }
            } else if (toInvokeMethod.parameters.length === 2) {
                try {
                    const result = toInvokeMethod.invoke(instance, testString1, testString2);
                    if (result && !result.isNull()) {
                        const resultString = new Il2Cpp.String(result);
                        console.log("2 params result:", resultString.content);
                    } else {
                        console.log("2 params result: NULL");
                    }
                } catch (e: any) {
                    console.log("2 params failed:", e.message);
                }
            }
        }
    });
}

async function traceAllMethods(TextEncryptUtil: any) {
    // const decrypt = TextEncryptUtil.method("FGNACANOIEC");

    // Il2Cpp.trace(true).methods(decrypt).and().attach();

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
                Il2Cpp.trace(true).methods(method).and().attach();
            } else {
                console.log(`[!] Method ${methodName} not found`);
            }
        } catch (e: any) {
            console.log(`[!] Error with ${methodName}: ${e.message}`);
        }
    }

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

// Define hexDump function first
function hexDump(ptr: any, length: any) {
    if (!ptr || ptr.isNull()) return "NULL";
    try {
        const hex = ptr.readByteArray(length);
        if (!hex) return "Cannot read";
        return hex.map((b: any) => ('0' + (b & 0xFF).toString(16)).slice(-2)).join(' ');
    } catch (e) {
        return "Error: " + e;
    }
}

async function hookMethodAtAddress(method: any, methodName: string) {
    try {
        // Use Interceptor.attach for low-level hooking
        const methodAddress = method.virtualAddress;

        Interceptor.attach(methodAddress, {
            onEnter: function (args: any) {
                console.log(`\n[📞 ${methodName} Called]`);
                // console.log(`   Address: 0x${methodAddress.toString(16)}`);
                // console.log(`   Thread ID: ${this.threadId}`);

                // // Log context for debugging
                // console.log(`   Context: ${this.context}`);

                // console.log("args[0] - MethodInfo*: " + args[0]);

                let argCount = 0;
                try {
                    argCount = args.length;
                    console.log("Number of arguments: " + argCount);
                } catch (e) {
                    // console.log("Cannot determine args length: " + e);//Cannot determine args length: RangeError: invalid array index
                    
                    argCount = method.parameters.length;//这个比较鲁棒，可以拿到正确的参数个数
                    // console.log("---------------argCount: " + argCount);
                }

                // for (let i = 0; i < argCount; i++) {
                //     if (args[i]) {
                //         console.log("args[" + i + "] - Additional arg: " + args[i]);

                //         // Try various interpretations
                //         try {
                //             const asString = Il2Cpp.string(args[i]);
                //             if (asString) {
                //                 console.log("  ↳ As Il2Cpp.String: '" + asString + "'");
                //             }
                //         } catch (e) {
                //             // Not an Il2Cpp string
                //         }

                //         try {
                //             const asUtf8 = args[i].readUtf8String();
                //             if (asUtf8 && asUtf8.length < 100) { // Limit length to avoid garbage
                //                 console.log("  ↳ As UTF-8: '" + asUtf8 + "'");
                //             }
                //         } catch (e) {
                //             // Not readable as UTF-8
                //         }

                //         // Try to read as pointer chain
                //         try {
                //             const deref = args[i].readPointer();
                //             if (deref && !deref.isNull()) {
                //                 console.log("  ↳ Points to: " + deref);
                //             }
                //         } catch (e) {
                //             // Can't dereference
                //         }
                //     } else {
                //         console.log("args[" + i + "] - NULL");
                //     }
                // }

                // console.log("\n=== BEGIN RAW ARGS DUMP ===");

                // for (let i = 0; i < args.length; i++) {//RangeError: invalid array index at onEnter (index.ts:420)
                for (let i = 0; i < argCount; i++) {
                    console.log(`\n--- args[${i}] ---`);
                    // console.log(`Address: ${args[i]}`);
                    // console.log(`As hex: 0x${args[i].toString(16)}`);
                    // console.log(`As decimal: ${args[i]}`);

                    if (args[i] && !args[i].isNull()) {
                        // Try as Il2Cpp string first
                        try {
                            const il2cppStr = Il2Cpp.string(args[i]);
                            console.log(`Il2Cpp.String: "${il2cppStr}"`);
                            console.log(`String length: ${il2cppStr.length}`);
                            continue; // Successfully read as string, skip other attempts
                        } catch (e) {
                            // Not an Il2Cpp string or bridge not available
                        }

                        // Try as C# string
                        try {
                            const csString = args[i].readUtf16String();
                            if (csString && csString.length > 0 && csString.length < 1000) {
                                console.log(`C# String: "${csString}"`);
                                continue;
                            }
                        } catch (e) {
                            // Not a C# string
                        }

                        // Try as UTF-8
                        try {
                            const utf8String = args[i].readUtf8String();
                            if (utf8String && utf8String.length > 0 && utf8String.length < 1000) {
                                console.log(`UTF-8 String: "${utf8String}"`);
                                continue;
                            }
                        } catch (e) {
                            // Not UTF-8
                        }

                        // Hex dump of first 32 bytes
                        console.log(`Hex dump (32 bytes): ${hexDump(args[i], 32)}`);

                        // Try to read as pointer
                        try {
                            const pointedTo = args[i].readPointer();
                            console.log(`Points to: ${pointedTo}`);
                        } catch (e) {
                            console.log("Cannot dereference");
                        }
                    } else {
                        console.log("NULL pointer");
                    }
                }

                // console.log("\n=== END ARGS DUMP ===");

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
                        // console.log(`   Return Value retval: ${retval}`);
                        console.log(`   Return Value result: ${result}`);//result:0x78f59dbcc0
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


function seeMethodSignature() {
    Il2Cpp.perform(() => {
        const assembly = Il2Cpp.domain.assembly("ScriptsFramework.Common");
        const TextEncryptUtil = assembly.image.class("Common.TextEncryptUtil.TextEncryptUtil");
    }
}

Il2Cpp.perform(getKeyIV_All).catch(console.error);