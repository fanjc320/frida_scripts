const { il2cpp } = require("frida-il2cpp-bridge");

async function main() {
    await il2cpp.initialize();
    
    console.log("🎯 IL2CPP Initialized");
    console.log("Unity Version:", il2cpp.unityVersion);
    console.log("Domain:", il2cpp.domain);
    
    // Search for the TextEncryptUtil class
    const assemblies = il2cpp.domain.assemblies;
    console.log("\n📦 Assemblies:", assemblies.length);
    
    for (const assembly of assemblies) {
        console.log(`\n🔍 Searching in assembly: ${assembly.name}`);
        
        const image = assembly.image;
        const classes = image.classes;
        
        for (const clazz of classes) {
            // Look for encryption related classes
            if (clazz.name.toLowerCase().includes("encrypt") || 
                clazz.name.toLowerCase().includes("text") ||
                clazz.name.toLowerCase().includes("util")) {
                
                console.log(`\n🎯 Found potential class: ${clazz.namespace}.${clazz.name}`);
                console.log(`   Methods: ${clazz.methods.length}`);
                
                // List all methods
                clazz.methods.forEach(method => {
                    console.log(`   - ${method.name} (${method.parameters.length} params)`);
                });
            }
        }
    }
}

main().catch(console.error);