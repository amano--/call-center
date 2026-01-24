import { defineConfig } from "orval";
export default defineConfig({
  waLive: {
    input: {
      target: "../server/http_schema.yml",
    },
    output: {
      mode: "tags-split", // メソッド毎にフォルダを分けてくれる
      clean: true,
      client: "axios", // axios以外にもclientは色々ある。今回はtanstack-query使っていないのでaxios
      target: "src/hooks/orval", // フックの作成先
      override: {
        mutator: {
          path: "src/lib/custom-instance.ts", // custom-instanceを元に作成
          name: "customInstance",
        },
      },
      prettier: true, // 作成したフックに対して自動でprettierを効かせてくれる
    },
  },
});