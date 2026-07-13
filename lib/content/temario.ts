import type { Topic } from "@/lib/domain/topic"

/**
 * THE canonical temario for the Operating Systems course.
 *
 * This is fixed content (RF-01): teachers enable/disable topics per course but
 * never edit this list. It is the single source of truth — every screen that
 * shows topics imports from here. Titles and subtopics are authoritative;
 * descriptions are short navigational summaries, NOT lesson content. The actual
 * teaching material (text, video, links per topic) lives in `content/temario/`
 * and is authored by the thesis team.
 *
 * 13 topics; topic 13 is complementary (optional).
 */
export const temario: Topic[] = [
  {
    number: 1,
    slug: "introduccion-a-linux",
    title: "Introducción a Linux",
    description: "Historia, kernel, entorno de ventanas e instalación.",
    subTopics: [
      { number: 1, title: "¿Qué es Linux? Dónde todo empezó" },
      { number: 2, title: "El Kernel" },
      { number: 3, title: "Entorno de ventanas" },
      { number: 4, title: "Instalación" },
    ],
  },
  {
    number: 2,
    slug: "directorios",
    title: "Directorios",
    description: "Tipos de directorios del sistema: etc/, home/, var/, tmp/, entre otros.",
    subTopics: [],
  },
  {
    number: 3,
    slug: "sistema-de-archivos",
    title: "Sistema de archivos",
    description: "Inodos y estructura del sistema de archivos.",
    subTopics: [],
  },
  {
    number: 4,
    slug: "creacion-de-directorios",
    title: "Creación de directorios",
    description: "Uso de mkdir y construcción de una estructura jerárquica.",
    subTopics: [],
  },
  {
    number: 5,
    slug: "creacion-de-archivos",
    title: "Creación de archivos",
    description: "touch y editores de texto: vi, pico, nano.",
    subTopics: [
      { number: 1, title: "touch" },
      { number: 2, title: "Editores: vi, pico, nano" },
    ],
  },
  {
    number: 6,
    slug: "permisos",
    title: "Permisos",
    description: "Gestión de permisos con chmod, chown y umask.",
    subTopics: [
      { number: 1, title: "chmod" },
      { number: 2, title: "chown" },
      { number: 3, title: "umask" },
    ],
  },
  {
    number: 7,
    slug: "compresion",
    title: "Compresión",
    description: "Compresión de archivos con tar, gzip, bzip2 y zip.",
    subTopics: [],
  },
  {
    number: 8,
    slug: "busqueda",
    title: "Búsqueda",
    description: "Patrones, expresiones regulares y uso de find y grep.",
    subTopics: [
      { number: 1, title: "Patrones" },
      { number: 2, title: "Expresiones regulares" },
      { number: 3, title: "find, grep" },
    ],
  },
  {
    number: 9,
    slug: "usuarios-y-grupos",
    title: "Usuarios y grupos",
    description: "passwd, shadow y creación de cuentas con useradd y groupadd.",
    subTopics: [
      { number: 1, title: "passwd" },
      { number: 2, title: "shadow" },
      { number: 3, title: "useradd, groupadd" },
    ],
  },
  {
    number: 10,
    slug: "gestion-de-procesos",
    title: "Gestión de procesos",
    description: "ps, top, kill, jobs y manejo de primer y segundo plano (fg, bg, &).",
    subTopics: [
      { number: 1, title: "ps, top" },
      { number: 2, title: "kill, jobs" },
      { number: 3, title: "Primer plano y segundo plano (fg, bg, &)" },
    ],
  },
  {
    number: 11,
    slug: "servicios-y-demonios",
    title: "Servicios y demonios",
    description: "systemctl y estados de los servicios.",
    subTopics: [
      { number: 1, title: "systemctl" },
      { number: 2, title: "Estados de servicios" },
    ],
  },
  {
    number: 12,
    slug: "shell-scripting",
    title: "Shell scripting",
    description: "Variables, condicionales, ciclos y funciones en Bash.",
    subTopics: [],
  },
  {
    number: 13,
    slug: "instalacion-de-paquetes",
    title: "Instalación de paquetes",
    description: "Gestión de paquetes con apt y dnf.",
    complementary: true,
    subTopics: [],
  },
]

/** Lookup a topic by its number. */
export function getTopic(number: number): Topic | undefined {
  return temario.find((t) => t.number === number)
}

/** Lookup a topic by its slug. */
export function getTopicBySlug(slug: string): Topic | undefined {
  return temario.find((t) => t.slug === slug)
}
