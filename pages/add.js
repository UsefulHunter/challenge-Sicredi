import Head from "next/head";

export default function Details({isEditing?}) {
  return (
    <div>
      <Head>
        <title>
            {isEditing ? "Editar" : "Adicionar"}
        </title>
      </Head>

      <main>
        <h1>{isEditing ? "Editar" : "Adicionar"}</h1>
      </main>
    </div>
  );
}
