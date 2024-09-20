function n(){return navigator.appVersion.includes("Win")}const i=n()?`\r
`:`
`;async function o(){return window.__TAURI_INVOKE__("plugin:os|platform")}async function _(){return window.__TAURI_INVOKE__("plugin:os|version")}async function r(){return window.__TAURI_INVOKE__("plugin:os|kind")}async function t(){return window.__TAURI_INVOKE__("plugin:os|arch")}async function u(){return window.__TAURI_INVOKE__("plugin:os|tempdir")}async function c(){return window.__TAURI_INVOKE__("plugin:os|locale")}export{i as EOL,t as arch,c as locale,o as platform,u as tempdir,r as type,_ as version};
