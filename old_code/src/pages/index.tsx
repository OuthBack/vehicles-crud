import { type GetStaticProps, type InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

type SwaggerOptions = Exclude<
  Parameters<typeof createSwaggerSpec>[0],
  undefined
>;
type Definition = SwaggerOptions["definition"];

export const getStaticProps: GetStaticProps<{
  spec: { definition: Definition };
}> = () => {
  const apiDocs = JSON.parse(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    JSON.stringify(require("~/docs/swagger.json"))
  ) as Definition;

  const spec = createSwaggerSpec({
    definition: {
      ...apiDocs,
    },
  }) as { definition: Definition };

  return {
    props: { spec },
  };
};

export default ApiDoc;
