import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'
// import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())

  const alias = {
    // 设置路径
    '~': path.resolve(__dirname, './'),
    // 设置别名
    '@': path.resolve(__dirname, './src')
  }

  return {
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: alias,
      // 导入时想要省略的扩展名列表
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js', //分包文件的打包路径。例如使用动态路由时，打包会自动分包，有时甚至会在vite配置文件中手动分包，分包的文件还是在assets文件夹下，通过配置该项将其放在指定的目录下
          // assetFileNames: '[ext]/[name].[ext]',

          // 其他文件配置1
          // assetFileNames: '[ext]/[name].[hash].[ext]', // 其他文件的打包配置，通过改配置项，会将对应后缀的文件打包到指定的目录下，例如css文件放到css目录下，fonts文件放到fonts目录下

          // 其他文件配置2
          assetFileNames(assetsInfo) {
            if (assetsInfo.name.endsWith('.css')) {
              return 'css/[name].[hash].css'
            }

            if (['png', 'jpeg', 'jpg', 'svg'].some(item => assetsInfo.name.endsWith(item))) {
              return 'img/[name].[hash].[ext]'
            }

            return 'assets/[name].[hash].[ext]'
          },
        }
      }
    },
    // vite 相关配置 
    server: {
      port: 3000,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: env.VITE_APP_API_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, '')
        },
        '/msghub': {
          target: env.VITE_APP_API_HOST,
          ws: true,
          rewrite: (path) => path.replace(/^\/msgHub/, '')
        }
      }
    }
  }

})