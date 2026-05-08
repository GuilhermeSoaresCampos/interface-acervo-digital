import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import LivroRequests from "../../../fetch/LivroRequests";
import type LivroDTO from "../../../dto/LivroDTO";
import { useNavigate } from "react-router-dom";
import styles from "./DetalhesLivro.module.css";

interface DetalheslivroProps {
    id_livro: number;
}

/**
 * Componente que exibe os detalhes de um livro.
 * Faz a consulta à API com base no ID fornecido e monta a visualização.
 */
function Detalheslivro({ id_livro }: DetalheslivroProps): JSX.Element {
    const [livro, setlivro] = useState<LivroDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await LivroRequests.obterlivroPorId(id_livro);
                if (dados) {
                    setlivro(dados);
                } else {
                    setError("livro não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do livro:", err);
                setError("Ocorreu um erro ao buscar as informações do livro.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_livro]);

    // Renderização do estado de carregamento (Skeleton)
    if (loading) {
        return (
            <div className={styles.mainContainer}>
                <div className={styles.card}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <Skeleton shape="circle" size="4rem"></Skeleton>
                            <div style={{ flex: 1 }}>
                                <Skeleton width="60%" height="2rem" style={{ marginBottom: "8px" }}></Skeleton>
                                <Skeleton width="40%"></Skeleton>
                            </div>
                        </div>
                        <Divider />
                        <div className={styles.infoGrid}>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i}>
                                    <Skeleton width="30%" style={{ marginBottom: "8px" }}></Skeleton>
                                    <Skeleton width="80%" height="1.5rem"></Skeleton>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Renderização do estado de erro
    if (error || !livro) {
        return (
            <div className={styles.mainContainer} style={{ justifyContent: "center", alignItems: "center" }}>
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    // Renderização dos detalhes do livro
    return (
        <main className={styles.mainContainer}>
            <div className={styles.card}>
                <h1 className={styles.cardTitle}>{livro.titulo}</h1>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                        <span className={styles.tag}>{livro.id_livro}</span>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.infoGrid}>
                        {/* Seção de Informações do Livro */}
                        <div className={styles.infoSection}>
                            <h3 className={styles.infoSectionTitle}>
                                <i className="pi pi-book" style={{ color: "#3b82f6" }}></i> Informações do Livro
                            </h3>
                            <div className={styles.infoContent}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Ano de publicação</span>
                                    <span className={styles.infoValue}>{new Date(livro.ano_publicacao).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Editora</span>
                                    <span className={styles.infoValue}>{livro.editora}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Status do livro</span>
                                    <span className={`${styles.statusTag} ${livro.status_livro ? styles.statusTagActive : styles.statusTagInactive}`}>
                                        {livro.status_livro ? "Ativo" : "Inativo"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Seção de Informações Adicionais */}
                        <div className={styles.infoSection}>
                            <h3 className={styles.infoSectionTitle}>
                                <i className="pi pi-info-circle" style={{ color: "#3b82f6" }}></i> Detalhes Adicionais
                            </h3>
                            <div className={styles.infoContent}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Autor</span>
                                    <span className={styles.infoValue}>{livro.autor || "Não informado"}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Quantidade total</span>
                                    <span className={styles.infoValue}>{livro.quant_total}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Quantidade disponível</span>
                                    <span className={styles.infoValue}>{livro.quant_disponivel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.buttonsContainer}>
                <button
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    onClick={() => navigate(`/atualizar/livro/${livro.id_livro}`)}
                >
                    Editar Livro
                </button>
                <button
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    onClick={() => navigate(`/lista/livros`)}
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default Detalheslivro;