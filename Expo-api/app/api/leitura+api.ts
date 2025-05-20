import firebase from '../../firebase-connect';

export async function GET(request: Request) {
  try {  
    let data = { msg: 'Olá, mundo!' };
    // Retorna os dados no formato JSON
    return new Response(JSON.stringify(data.msg), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Retorna um erro caso algo dê errado
    return new Response(JSON.stringify({ error: 'Erro ao buscar dados', details: 'error.message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
