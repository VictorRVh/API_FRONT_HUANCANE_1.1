// vite.config.js
import { defineConfig } from "file:///C:/xampp/htdocs/Sebastian_api/node_modules/vite/dist/node/index.js";
import laravel from "file:///C:/xampp/htdocs/Sebastian_api/node_modules/laravel-vite-plugin/dist/index.mjs";
import vue from "file:///C:/xampp/htdocs/Sebastian_api/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import dotenv from "file:///C:/xampp/htdocs/Sebastian_api/node_modules/dotenv/lib/main.js";
var vite_config_default = defineConfig(() => {
  const isDevCommantRunOnClient = process.env.INIT_CWD.includes("client");
  const env = dotenv.config({
    path: path.join(
      process.env.INIT_CWD,
      `${isDevCommantRunOnClient ? "../" : ""}.env`
    )
  });
  const frontendEnvs = ["APP_URL"];
  const clientEnv = Object.entries(env.parsed).filter(([key, _]) => frontendEnvs.includes(key)).reduce(
    (clientEnv2, [key, value]) => ({ ...clientEnv2, [key]: value }),
    {}
  );
  return {
    plugins: [
      laravel({
        input: ["resources/js/app.js"],
        refresh: true
      }),
      vue({
        template: {
          transformAssetUrls: {
            // The Vue plugin will re-write asset URLs, when referenced
            // in Single File Components, to point to the Laravel web
            // server. Setting this to `null` allows the Laravel plugin
            // to instead re-write asset URLs to point to the Vite
            // server instead.
            base: null,
            // The Vue plugin will parse absolute URLs and treat them
            // as absolute paths to files on disk. Setting this to
            // `false` will leave absolute URLs un-touched so they can
            // reference assets in the public directory as expected.
            includeAbsolute: false
          }
        }
      })
    ],
    define: {
      "process.env": clientEnv
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcU2ViYXN0aWFuX2FwaVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxceGFtcHBcXFxcaHRkb2NzXFxcXFNlYmFzdGlhbl9hcGlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3hhbXBwL2h0ZG9jcy9TZWJhc3RpYW5fYXBpL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgbGFyYXZlbCBmcm9tICdsYXJhdmVsLXZpdGUtcGx1Z2luJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCkgPT4ge1xuICAgIGNvbnN0IGlzRGV2Q29tbWFudFJ1bk9uQ2xpZW50ID0gcHJvY2Vzcy5lbnYuSU5JVF9DV0QuaW5jbHVkZXMoJ2NsaWVudCcpO1xuXG4gICAgY29uc3QgZW52ID0gZG90ZW52LmNvbmZpZyh7XG4gICAgICAgIHBhdGg6IHBhdGguam9pbihcbiAgICAgICAgICAgIHByb2Nlc3MuZW52LklOSVRfQ1dELFxuICAgICAgICAgICAgYCR7aXNEZXZDb21tYW50UnVuT25DbGllbnQgPyAnLi4vJyA6ICcnfS5lbnZgLFxuICAgICAgICApLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZnJvbnRlbmRFbnZzID0gWydBUFBfVVJMJ107XG5cbiAgICBjb25zdCBjbGllbnRFbnYgPSBPYmplY3QuZW50cmllcyhlbnYucGFyc2VkKVxuICAgICAgICAuZmlsdGVyKChba2V5LCBfXSkgPT4gZnJvbnRlbmRFbnZzLmluY2x1ZGVzKGtleSkpXG4gICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAoY2xpZW50RW52LCBba2V5LCB2YWx1ZV0pID0+ICh7IC4uLmNsaWVudEVudiwgW2tleV06IHZhbHVlIH0pLFxuICAgICAgICAgICAge30sXG4gICAgICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICBsYXJhdmVsKHtcbiAgICAgICAgICAgICAgICBpbnB1dDogWydyZXNvdXJjZXMvanMvYXBwLmpzJ10sXG4gICAgICAgICAgICAgICAgcmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdnVlKHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1Bc3NldFVybHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBWdWUgcGx1Z2luIHdpbGwgcmUtd3JpdGUgYXNzZXQgVVJMcywgd2hlbiByZWZlcmVuY2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiBTaW5nbGUgRmlsZSBDb21wb25lbnRzLCB0byBwb2ludCB0byB0aGUgTGFyYXZlbCB3ZWJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlcnZlci4gU2V0dGluZyB0aGlzIHRvIGBudWxsYCBhbGxvd3MgdGhlIExhcmF2ZWwgcGx1Z2luXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBpbnN0ZWFkIHJlLXdyaXRlIGFzc2V0IFVSTHMgdG8gcG9pbnQgdG8gdGhlIFZpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlcnZlciBpbnN0ZWFkLlxuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZTogbnVsbCxcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIFZ1ZSBwbHVnaW4gd2lsbCBwYXJzZSBhYnNvbHV0ZSBVUkxzIGFuZCB0cmVhdCB0aGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcyBhYnNvbHV0ZSBwYXRocyB0byBmaWxlcyBvbiBkaXNrLiBTZXR0aW5nIHRoaXMgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBmYWxzZWAgd2lsbCBsZWF2ZSBhYnNvbHV0ZSBVUkxzIHVuLXRvdWNoZWQgc28gdGhleSBjYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlZmVyZW5jZSBhc3NldHMgaW4gdGhlIHB1YmxpYyBkaXJlY3RvcnkgYXMgZXhwZWN0ZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlQWJzb2x1dGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgZGVmaW5lOiB7XG4gICAgICAgICAgICAncHJvY2Vzcy5lbnYnOiBjbGllbnRFbnYsXG4gICAgICAgIH0sXG4gICAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUixTQUFTLG9CQUFvQjtBQUM5UyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFFbkIsSUFBTyxzQkFBUSxhQUFhLE1BQU07QUFDOUIsUUFBTSwwQkFBMEIsUUFBUSxJQUFJLFNBQVMsU0FBUyxRQUFRO0FBRXRFLFFBQU0sTUFBTSxPQUFPLE9BQU87QUFBQSxJQUN0QixNQUFNLEtBQUs7QUFBQSxNQUNQLFFBQVEsSUFBSTtBQUFBLE1BQ1osR0FBRywwQkFBMEIsUUFBUSxFQUFFO0FBQUEsSUFDM0M7QUFBQSxFQUNKLENBQUM7QUFFRCxRQUFNLGVBQWUsQ0FBQyxTQUFTO0FBRS9CLFFBQU0sWUFBWSxPQUFPLFFBQVEsSUFBSSxNQUFNLEVBQ3RDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLGFBQWEsU0FBUyxHQUFHLENBQUMsRUFDL0M7QUFBQSxJQUNHLENBQUNBLFlBQVcsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFLEdBQUdBLFlBQVcsQ0FBQyxHQUFHLEdBQUcsTUFBTTtBQUFBLElBQzNELENBQUM7QUFBQSxFQUNMO0FBRUosU0FBTztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ0osT0FBTyxDQUFDLHFCQUFxQjtBQUFBLFFBQzdCLFNBQVM7QUFBQSxNQUNiLENBQUM7QUFBQSxNQUNELElBQUk7QUFBQSxRQUNBLFVBQVU7QUFBQSxVQUNOLG9CQUFvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU1oQixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU1OLGlCQUFpQjtBQUFBLFVBQ3JCO0FBQUEsUUFDSjtBQUFBLE1BQ0osQ0FBQztBQUFBLElBQ0w7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNKLGVBQWU7QUFBQSxJQUNuQjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogWyJjbGllbnRFbnYiXQp9Cg==
