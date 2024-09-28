import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         api: 'modern',
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       '@tests': path.resolve(__dirname, './tests'),
//       '@assets': path.resolve(__dirname, './src/assets'),
//       '@components': path.resolve(__dirname, './src/components'),
//       '@features': path.resolve(__dirname, './src/features'),
//       '@users': path.resolve(__dirname, './src/features/users'),
//     },
//   },
// });

export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), 'VITE');
  const envWithProcessPrefix = {
    'process.env': `${JSON.stringify(env)}`,
  };

  return {
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@tests': path.resolve(__dirname, './tests'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@features': path.resolve(__dirname, './src/features'),
        '@users': path.resolve(__dirname, './src/features/users'),
      },
    },
    define: envWithProcessPrefix,
  };
});
