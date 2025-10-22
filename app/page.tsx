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
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-8 max-sm:w-full max-sm:max-w-screen-lg">
      <Section
        variant="grid"
        minHeight="min-h-screen"
        className="max-sm:grid-cols-1 min-md:grid-cols-2 w-full min-md:px-16"
      >
        <div className="flex flex-col items-start min-md:mb-60 max-sm:px-4">
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

          <div className="gap-4 w-full pb-8">
            <div className="flex items-center gap-4 max-sm:flex-col max-sm:w-full">
              <Link href="/Cadastro">
                <Button className="w-4xs max-sm:w-full">Começar Grátis</Button>
              </Link>
            </div>

            <Spacer size="sm" />

            <div className="flex items-center max-sm:justify-center gap-6 max-sm:w-full">
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

        <Image src={ImageWithFallback} alt="imagem" className="w-full h-auto" />
      </Section>

      <Section flexDirection="flex-col" className="justify-center max-sm:px-4">
        <Text variant="h1" className="text-center">
          Recursos que fazem a diferença
        </Text>

        <Text color="tertiary" className="text-center">
          Tudo que você precisa para ter controle total sobre suas finanças
          pessoais em uma única plataforma.
        </Text>

        <div className="flex justify-between min-md:gap-8 mt-16 max-sm:flex-col max-sm:gap-16">
          <div className="flex flex-col items-center text-center min-md:gap-4 max-sm:gap-2">
            <FiTrendingUp size={30} color={colors.brand.info} />
            <Text variant="h2">Controle Financeiro Completo</Text>
            <Text color="tertiary">
              Monitore suas receitas,
              <br /> despesas e saldo em tempo
              <br /> real com dashboards intuitivos.
            </Text>
          </div>

          <div className="flex flex-col items-center text-center min-md:gap-4 max-sm:gap-2">
            <FiBarChart size={30} color={colors.brand.success} />
            <Text variant="h2">Relatórios Detalhados</Text>
            <Text color="tertiary">
              Visualize seus gastos por
              <br /> categoria e acompanhe
              <br /> sua evolução financeira.
            </Text>
          </div>

          <div className="flex flex-col items-center text-center min-md:gap-4 max-sm:gap-2">
            <FiShield size={30} color={colors.brand.secondary} />
            <Text variant="h2">Segurança Total</Text>
            <Text color="tertiary">
              Seus dados estão protegidos
              <br /> com a mais alta tecnologia
              <br /> de segurança.
            </Text>
          </div>

          <div className="flex flex-col items-center text-center min-md:gap-4 max-sm:gap-2">
            <FiSmartphone size={30} color={colors.brand.danger} />
            <Text variant="h2">Design Responsivo</Text>
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
        className="flex justify-evenly max-sm:flex-col max-sm:items-center max-sm:gap-8 max-sm:py-16"
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
        className="justify-center max-sm:px-4 max-sm:py-8"
      >
        <Text variant="h1">O que nossos usuários dizem</Text>
        <Text color="tertiary">
          Depoimentos reais de quem transformou sua vida financeira
        </Text>

        <div className="flex min-md:items-center justify-evenly w-full max-sm:flex-col max-sm:gap-8 mt-8">
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

      <Section
        flexDirection="flex-col"
        minHeight="min-h-[40vh]"
        backgroundColor={colors.text.primary}
        className="justify-center gap-4 max-sm:px-4 max-sm:py-8 max-sm:w-full"
      >
        <Text variant="h1" color="white" className="max-sm:text-center">
          Pronto para transformar suas finanças?
        </Text>

        <Text variant="h3" color="white" className="max-sm:text-center">
          Junte-se a milhares de usuários que já estão no controle de suas
          finanças
        </Text>

        <div className="flex items-center gap-4 max-sm:flex-col max-sm:w-full">
          <Link href="/Cadastro">
            <Button className="w-xsm bg-white text-black max-sm:w-full">
              Criar Conta Grátis
            </Button>
          </Link>
          <Link href="/Login">
            <Button className="max-sm:w-full">Fazer Login</Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
