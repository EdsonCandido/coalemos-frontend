type UpdateBannerProps = {
  visible: boolean;
  secondsLeft: number;
};

const UpdateBanner = ({ visible, secondsLeft }: UpdateBannerProps) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '12px 16px',
        backgroundColor: '#1e40af',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 500,
      }}
    >
      Conteúdo atualizado. Atualizando em {secondsLeft}s…
    </div>
  );
};

export default UpdateBanner;
