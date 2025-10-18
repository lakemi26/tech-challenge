import ImageWithFallback from "@/app/public/ImageWithFallback.png";
import Logo from "@/components/Logo";
import Image from "next/image";
import { Spacer } from "@/components/Spacer";
import { Button, Text } from "@/components";
import { colors } from "@/utils/tokens";
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
          <Text variant="h1">
            Gerencie suas
            <br />{" "}
            <Text variant="h1" color="blue">
              finanças
            </Text>{" "}
            com
            <br />{" "}
            <Text variant="h1" color="purple">
              inteligência
            </Text>
          </Text>

          <Spacer size="sm" />

          <Text variant="button" color="tertiary">
            A plataforma completa para controlar receitas, despesas e<br />{" "}
            alcançar seus objetivos financeiros de forma simples e segura.
          </Text>

          <Spacer size="sm" />

          <div className="gap-4">
            <Button className="w-4xs">Começar Grátis</Button>

            <Spacer size="sm" />

            <div className="flex items-center gap-6">
              <div className="flex items-start justify-center gap-2">
                <FiUsers size={20} className="text-black" />
                <Text>+10.000 usuários</Text>
              </div>

              <div className="flex items-start justify-center gap-2">
                <Stars />
                <Text>4,9/5 avaliação</Text>
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
        <Text variant="h1">Recursos que fazem a diferença</Text>

        <Text color="tertiary">
          Tudo que você precisa para ter controle total sobre suas finanças
          <br />
          pessoais em uma única plataforma.
        </Text>

        <div className="flex justify-between gap-8 mt-16">
          <div className="flex flex-col items-center text-center gap-4">
            <FiTrendingUp size={30} color={colors.brand.info} />
            <Text variant="h2">Controle Financeiro Completo</Text>
            <Spacer size="sm" />
            <Text color="tertiary">
              Monitore suas receitas,
              <br /> despesas e saldo em tempo
              <br /> real com dashboards intuitivos.
            </Text>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <FiBarChart size={30} color={colors.brand.success} />
            <Text variant="h2">Relatórios Detalhados</Text>
            <Spacer size="sm" />
            <Text color="tertiary">
              Visualize seus gastos por
              <br /> categoria e acompanhe
              <br /> sua evolução financeira.
            </Text>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <FiShield size={30} color={colors.brand.secondary} />
            <Text variant="h2">Segurança Total</Text>
            <Spacer size="sm" />
            <Text color="tertiary">
              Seus dados estão protegidos
              <br /> com a mais alta tecnologia
              <br /> de segurança.
            </Text>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <FiSmartphone size={30} color={colors.brand.danger} />
            <Text variant="h2">Design Responsivo</Text>
            <Spacer size="sm" />
            <Text color="tertiary">
              Acesse de qualquer dispositivo
              <br /> - desktop, tablet ou
              <br /> smartphone.
            </Text>
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
          <Text variant="h1" color="white">
            R$ 10M+
          </Text>
          <Text color="white">Transações processadas</Text>
        </div>

        <div className="flex flex-col items-center">
          <Text variant="h1" color="white">
            99,9%
          </Text>
          <Text color="white">Disponibilidade</Text>
        </div>

        <div className="flex flex-col items-center">
          <Text variant="h1" color="white">
            24/7
          </Text>
          <Text color="white">Suporte disponível</Text>
        </div>
      </Section>

      <Section
        flexDirection="flex-col"
        className="justify-center"
        horizontalSpace="px-0"
      >
        <Text variant="h1">O que nossos usuários dizem</Text>
        <Text color="tertiary">
          Depoimentos reais de quem transformou sua vida financeira
        </Text>
        <Spacer size="lg" />

        <div className="flex items-center justify-evenly w-full ">
          <div className="flex flex-col gap-3">
            <Stars quantity={5} />
            <Text>
              "Finalmente consegui organizar minhas
              <br /> finanças de forma simples e eficiente!"
            </Text>

            <div className="flex flex-col">
              <Text>Maria Silva</Text>
              <Text color="tertiary">Empreendedora</Text>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Stars quantity={5} />
            <Text italic>
              "O melhor app para controle financeiro que já
              <br /> usei. Interface intuitiva e completa."
            </Text>

            <div className="flex flex-col">
              <Text>João Santos</Text>
              <Text color="tertiary">Freelancer</Text>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Stars quantity={5} />
            <Text>
              "Revolucionou minha gestão financeira.
              <br />
              Recomendo para todos!"
            </Text>

            <div className="flex flex-col">
              <Text>Ana Costa</Text>
              <Text color="tertiary">Consultora</Text>
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
          <Text variant="h1" color="white">
            Pronto para transformar suas finanças?
          </Text>

          <Text variant="h3" color="white">
            Junte-se a milhares de usuários que já estão no controle de suas
            finanças
          </Text>

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
          backgroundColor={colors.background.dark}
        >
          <Logo className="text-white" textColor="white" />
          <Text color="tertiary">
            © 2025 FinanceApp. Todos os direitos reservados.
          </Text>
        </Section>
      </footer>
    </div>
  );
}
