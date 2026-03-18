interface ContactSuccessProps {
  onNewMessage: () => void;
}

export function ContactSuccess({ onNewMessage }: ContactSuccessProps) {
  return (
    <div className="text-center space-y-6">
      <h2 className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-2xl flex items-center gap-2 justify-center">
        Obrigado!
      </h2>
      <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">
        Sua mensagem foi enviada com sucesso.
        <br />
        Voce recebera uma resposta em breve!
      </p>
      <button
        onClick={onNewMessage}
        className="bg-[#ffb86a] hover:bg-[#ffb86a]/90 transition-colors px-4 py-2.5 rounded-lg font-['Fira_Code',sans-serif] text-[#020618] text-[14px]"
      >
        enviar-nova-mensagem
      </button>
    </div>
  );
}
