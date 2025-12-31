import "frida-il2cpp-bridge";

console.log("Script loaded successfully ..... ");

async function main() {
    await Il2Cpp.initialize();
    const domain = await Il2Cpp.Domain.get();
    console.log("il2cpp loaded at ",domain);
}

main().catch(error => console.log(error.stack));