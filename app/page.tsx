import ImageWithFallback from "@/app/assets/ImageWithFallback.png";
import Logo from "@/components/Logo";
import Image from "next/image";
import { Spacer } from "@/components/Spacer";
import Button from "@/components/Button";
import { colors } from "@/utils/colors";
import {
  FiUsers,
  FiTrendingUp,
  FiBarChart,
  FiShield,
  FiSmartphone,
} from "react-icons/fi";
import Section from "@/components/Section";
import Stars from "@/components/Stars";

export default function Home() {
  return (
    <div className="pt-8">
      <header className="flex items-center justify-between px-16 ">
        <Logo />

        <div className="flex items-center gap-4">
          <Button variant="secondary">Entrar</Button>
          <Button>Criar Conta</Button>
        </div>
      </header>

      <Spacer size={"lg"} />

      <Section variant="grid" minHeight="min-h-screen" className="grid-cols-2">
        <div className="flex flex-col items-start mb-60">
          <h1 className="text-6xl font-bold leading-tight">
            Gerencie suas
            <br />
            <span className="text-cyan-500">finanças</span> com
            <br />
            <span className="text-purple-500">inteligência</span>
          </h1>

          <Spacer size="sm" />

          <span>
            A plataforma completa para controlar receitas, despesas e<br />{" "}
            alcançar seus objetivos financeiros de forma simples e segura.
          </span>

          <Spacer size="sm" />

          <div className="gap-4">
            <Button className="w-4xs">Começar Grátis</Button>

            <Spacer size="sm" />

            <div className="flex items-center gap-6">
              <div className="flex items-start justify-center gap-2">
                <FiUsers size={20} className="text-black" />
                <span>+10.000 usuários</span>
              </div>

              <div className="flex items-start justify-center gap-2">
                <Stars />
                <span>4,9/5 avaliação</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end h-full">
          <Image
            src={ImageWithFallback}
            alt="imagem"
            className="w-6xl h-auto"
          />
        </div>
      </Section>

      <Section flexDirection="flex-col" className="justify-center">
        <h1 className="text-[40px] font-bold">
          Recursos que fazem a diferença
        </h1>
        <p
          className={`text-xl text-center`}
          style={{ color: colors.text.tertiary }}
        >
          Tudo que você precisa para ter controle total sobre suas finanças
          <br />
          pessoais em uma única plataforma.
        </p>

        <div className="flex justify-between gap-8 mt-16">
          <div className="flex flex-col items-center text-center gap-4">
            <FiTrendingUp size={30} color={colors.brand.info} />
            <h2 className="text-xl text-[#030213]">
              Controle Financeiro Completo
            </h2>
            <Spacer size="sm" />
            <span
              className={`text-base`}
              style={{ color: colors.text.tertiary }}
            >
              Monitore suas receitas,
              <br /> despesas e saldo em tempo
              <br /> real com dashboards intuitivos.
            </span>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <FiBarChart size={30} color={colors.brand.success} />
            <h2 className="text-xl" style={{ color: "#030213" }}>
              Relatórios Detalhados
            </h2>
            <Spacer size="sm" />
            <span
              className={`text-base`}
              style={{ color: colors.text.tertiary }}
            >
              Visualize seus gastos por
              <br /> categoria e acompanhe
              <br /> sua evolução financeira.
            </span>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <FiShield size={30} color={colors.brand.secondary} />
            <h2 className="text-xl" style={{ color: "#030213" }}>
              Segurança Total
            </h2>
            <Spacer size="sm" />
            <span
              className={`text-base`}
              style={{ color: colors.text.tertiary }}
            >
              Seus dados estão protegidos
              <br /> com a mais alta tecnologia
              <br /> de segurança.
            </span>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <FiSmartphone size={30} color={colors.brand.danger} />
            <h2 className="text-xl text-[#030213]">Design Responsivo</h2>
            <Spacer size="sm" />
            <span
              className={`text-base`}
              style={{ color: colors.text.tertiary }}
            >
              Acesse de qualquer dispositivo
              <br /> - desktop, tablet ou
              <br />
              smartphone.
            </span>
          </div>
        </div>
      </Section>

      <Spacer size={"lg"} />

      <Section
        className="justify-evenly"
        minHeight="min-h-[20vh]"
        horizontalSpace="px-0"
        backgroundColor={colors.background.gradient.landing}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-[36px] font-bold text-white">R$ 10M+</h1>
          <span
            className={`text-base`}
            style={{ color: colors.background.primary }}
          >
            Transações processadas
          </span>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[36px] font-bold text-white">99,9%</h1>
          <span
            className={`text-base`}
            style={{ color: colors.background.primary }}
          >
            Disponibilidade
          </span>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[36px] font-bold text-white">24/7</h1>
          <span
            className={`text-base`}
            style={{ color: colors.background.primary }}
          >
            Suporte disponível
          </span>
        </div>
      </Section>

      <Section
        flexDirection="flex-col"
        className="justify-center"
        horizontalSpace="px-0"
      >
        <h1 className="text-[40px] font-bold">O que nossos usuários dizem</h1>
        <span className={`text-[20px]`} style={{ color: colors.text.tertiary }}>
          Depoimentos reais de quem transformou sua vida financeira
        </span>

        <Spacer size="lg" />

        <div className="flex items-center justify-evenly w-full ">
          <div className="flex flex-col gap-3">
            <Stars quantity={5} />

            <span>
              "Finalmente consegui organizar minhas
              <br /> finanças de forma simples e eficiente!"
            </span>

            <div className="flex flex-col">
              <span className="text-base font-bold">Maria Silva</span>
              <span
                className={`text-base`}
                style={{ color: colors.text.tertiary }}
              >
                Empreendedora
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Stars quantity={5} />

            <span className="italic" style={{ color: "#364153" }}>
              "O melhor app para controle financeiro que já
              <br /> usei. Interface intuitiva e completa."
            </span>

            <div className="flex flex-col">
              <span className="text-base font-bold">João Santos</span>
              <span
                className={`text-base`}
                style={{ color: colors.text.tertiary }}
              >
                Freelancer
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Stars quantity={5} />

            <span>
              "Revolucionou minha gestão financeira.
              <br />
              Recomendo para todos!"
            </span>

            <div className="flex flex-col">
              <span className="text-base font-bold">Ana Costa</span>
              <span
                className={`text-base`}
                style={{ color: colors.text.tertiary }}
              >
                Consultora
              </span>
            </div>
          </div>
        </div>
      </Section>

      <footer>
        <Section
          flexDirection="flex-col"
          minHeight="min-h-[40vh]"
          backgroundColor={colors.text.primary}
          className="justify-center gap-4"
        >
          <h1 className="text-white text-[38px] font-bold">
            Pronto para transformar suas finanças?
          </h1>

          <h1
            className={`text-[21px] text-center`}
            style={{ color: colors.background.secondary }}
          >
            Junte-se a milhares de usuários que já estão no controle de suas
            finanças
          </h1>

          <div className="flex items-center gap-4">
            <Button className="w-xsm bg-white text-black">
              Criar Conta Grátis
            </Button>
            <Button>Fazer Login</Button>
          </div>
        </Section>

        <Section
          className="justify-between"
          minHeight="min-h-[20vh]"
          backgroundColor="#1E2939"
        >
          <Logo className="text-white" textColor="white" />
          <span style={{ color: colors.text.tertiary }}>
            © 2025 FinanceApp. Todos os direitos reservados.
          </span>
        </Section>
      </footer>
    </div>
  );
}
