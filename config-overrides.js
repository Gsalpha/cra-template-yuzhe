const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
} = require('customize-cra')
const { resolve } = require('path')
const darkThemeVars = require('antd/dist/dark-theme')

module.exports = override(
    addWebpackAlias({
        '@': resolve('src')
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            hack: `true;@import "${require.resolve(
                'antd/lib/style/color/colorPalette.less'
            )}";`,
            ...darkThemeVars
        }
    })
)
