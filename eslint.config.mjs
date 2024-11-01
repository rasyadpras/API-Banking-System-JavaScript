import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...fixupConfigRules(compat.extends("eslint:recommended", "plugin:import/recommended")),
    {
        languageOptions: {
            globals: {
                ...globals.commonjs,
                ...globals.node,
            },

            ecmaVersion: "latest",
            sourceType: "commonjs",
        },

        rules: {
            "no-console": "off",
            "quotes": [
                "error",
                "double",
                {
                    "allowTemplateLiterals": true,
                    "avoidEscape": true
                }
            ],
            camelcase: "off",
            "indent": ["error", 4],
            "semi": ["error", "always"],
            "import/newline-after-import": "off",
            "consistent-return": "off",
        },
    },
];