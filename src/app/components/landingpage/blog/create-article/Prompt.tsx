// components/Prompt.tsx
"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Prompt: React.FC = () => {
  // Obtiene el estado del modo oscuro
  const [inputs, setInputs] = useState({
    expertTopic: "",
    websiteAbout: "",
    userQuestion: "",
    numberWords: "",
    mainKeyword: "",
    secondaryKeywords1: "",
    secondaryKeywords2: "",
    secondaryKeywords3: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const InfoCopie = () => {
    Swal.fire({
      title: "Listo",
      text: "Tu prompt ha sido copiado al portapapeles. Ve a Chat GPT para pegarlo y generar tu artículo.",
      icon: "success",
      confirmButtonText: "¡Ok!",
    });
  };

  const InfoCompleteInputs = () => {
    Swal.fire({
      title: "Incompleto",
      text: "Por favor, completa todos los campos antes de copiar.",
      icon: "error",
      confirmButtonText: "¡Ok!",
    });
  };

  const areInputsEmpty = () => {
    return Object.values(inputs).some((value) => value === "");
  };

  const handleCopyClick = async () => {
    if (areInputsEmpty()) {
      InfoCompleteInputs();
      return;
    }
    const promptDiv = document.getElementById("prompt");
    let textToCopy = "";

    // Iterar a través de cada elemento hijo del div
    promptDiv?.childNodes.forEach((node) => {
      if (node.nodeName === "INPUT") {
        textToCopy += (node as HTMLInputElement).value + " ";
      } else if (node.nodeName === "OL") {
        node.childNodes.forEach((li) => {
          li.childNodes.forEach((subNode) => {
            if (subNode.nodeName === "INPUT") {
              textToCopy += (subNode as HTMLInputElement).value + " ";
            } else {
              textToCopy += subNode.textContent + " ";
            }
          });
          textToCopy += "\n";
        });
      } else {
        textToCopy += node.textContent + " ";
      }
    });

    try {
      await navigator.clipboard.writeText(textToCopy.trim());
      InfoCopie();
    } catch (err) {
      console.error("Error al copiar texto: ", err);
    }
  };

  const handleInfoClick = (info: string) => {
    Swal.fire({
      title: "Información",
      text: info,
      icon: "info",
      confirmButtonText: "Entendido",
    });
  };

  return (
    <div
      id="prompt"
      className={`p-6 mb-4 rounded-lg shadow bg-white dark:bg-[#191d22] m-6 `}
    >
      <h2 className="text-2xl font-bold mb-4">Prompt:</h2>

      <div>
        <span>Escribe como un experto en SEO y </span>
        <div className="inline-flex items-center">
          <input
            name="expertTopic"
            value={inputs.expertTopic}
            onChange={handleInputChange}
            placeholder="tema de experto"
            className="border rounded p-2 py-1 mr-2 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={() =>
              handleInfoClick(
                "Ingresa el tema específico de tu experiencia sobre el cual planeas escribir tu artículo. Por ejemplo, si eres experto en aprendizaje automático, podrías escribir 'Implementación de Redes Neuronales en Python'."
              )
            }
            className="text-blue-500 hover:text-blue-700"
          >
            ℹ️
          </button>
        </div>
        <span> un artículo para mi </span>
        <div className="inline-flex items-center">
          <input
            name="websiteAbout"
            value={inputs.websiteAbout}
            onChange={handleInputChange}
            placeholder="¿de qué trata tu sitio web?"
            className="border rounded p-2 py-1 mr-2 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={() =>
              handleInfoClick(
                "¿Sobre qué trata tu sitio web? Especifica el tema central o nicho en el que te enfocas. Por ejemplo, si tu sitio web es sobre desarrollo personal, podrías escribir 'Técnicas de Desarrollo Personal y Prácticas de Mindfulness'."
              )
            }
            className="text-blue-500 hover:text-blue-700"
          >
            ℹ️
          </button>
        </div>
        <span>. Sigue estas pautas:</span>
      </div>

      <div className="p-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Aborda la intención de búsqueda de un usuario que quiere saber{" "}
            <div className="inline-flex items-center">
              <input
                name="userQuestion"
                value={inputs.userQuestion}
                onChange={handleInputChange}
                placeholder="pregunta del usuario"
                className="border rounded p-2 py-1 mr-2 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() =>
                  handleInfoClick(
                    "Especifica aquí el tema o pregunta clave que tu sitio web pretende abordar, para alinearte mejor con la intención de búsqueda de tus usuarios. Por ejemplo, si tu sitio se enfoca en fitness, podrías escribir 'Cómo lograr un estilo de vida equilibrado a través del fitness y la nutrición'."
                  )
                }
                className="text-blue-500 hover:text-blue-700"
              >
                ℹ️
              </button>
            </div>
            .
          </li>
          <li>
            El artículo debe tener una extensión de:{" "}
            <div className="inline-flex items-center">
              <input
                name="numberWords"
                value={inputs.numberWords}
                onChange={handleInputChange}
                type="number"
                placeholder="número de palabras"
                className="border rounded p-2 py-1 mr-2 w-24 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() =>
                  handleInfoClick(
                    "Especifica la extensión del artículo en número de palabras. Por ejemplo, si estás escribiendo una guía completa, podrías apuntar a al menos 2000 palabras; para una actualización rápida, 500 palabras podrían ser suficientes."
                  )
                }
                className="text-blue-500 hover:text-blue-700"
              >
                ℹ️
              </button>
            </div>
            palabras.
          </li>
          <li>
            La palabra clave principal para optimización SEO es{" "}
            <div className="inline-flex items-center">
              <input
                name="mainKeyword"
                value={inputs.mainKeyword}
                onChange={handleInputChange}
                placeholder="palabra clave principal"
                className="border rounded p-2 py-1 mr-2 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() =>
                  handleInfoClick(
                    "La palabra clave principal para optimización SEO. Por ejemplo, si tu artículo es sobre 'moda sostenible', tu palabra clave principal podría ser 'tendencias de moda sostenible'."
                  )
                }
                className="text-blue-500 hover:text-blue-700"
              >
                ℹ️
              </button>
            </div>
            .
          </li>
          <li>
            Las palabras clave secundarias son{" "}
            <input
              name="secondaryKeywords1"
              value={inputs.secondaryKeywords1}
              onChange={handleInputChange}
              placeholder="palabra clave secundaria 1"
              className="border rounded p-2 py-1 mr-2 dark:bg-gray-700 dark:text-white"
            />
            ,{" "}
            <input
              name="secondaryKeywords2"
              value={inputs.secondaryKeywords2}
              onChange={handleInputChange}
              placeholder="palabra clave secundaria 2"
              className="border rounded p-2 py-1 mr-2 dark:bg-gray-700 dark:text-white"
            />
            , y{" "}
            <div className="inline-flex items-center">
              <input
                name="secondaryKeywords3"
                value={inputs.secondaryKeywords3}
                onChange={handleInputChange}
                placeholder="palabra clave secundaria 3"
                className="border rounded p-2 py-1 mr-2 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() =>
                  handleInfoClick(
                    "Estas son palabras clave adicionales que respaldan tu palabra clave principal. Por ejemplo, si tu palabra clave principal es 'tendencias de moda sostenible', tus palabras clave secundarias podrían ser 'ropa ecológica', 'materiales orgánicos' y 'marcas de moda ética'."
                  )
                }
                className="text-blue-500 hover:text-blue-700"
              >
                ℹ️
              </button>
            </div>
            .
          </li>
          <li>Incluye un solo H1 al principio.</li>
          <li>
            Puedes usar tantos encabezados H2 y H3 como creas necesario para
            satisfacer la intención de búsqueda del artículo; no tienes que
            optimizarlos.
          </li>
          <li>
            El artículo debe ser informativo, ya que los usuarios están en el
            primer nivel de conciencia en el viaje del cliente, lejos de
            realizar una compra.
          </li>
          <li>
            Maximiza la retención del usuario para que termine de leer el
            artículo; utiliza un bucle abierto al principio para generar
            intriga.
          </li>
          <li>
            No agregues contenido que no aporte valor; no inventes datos; todo
            el artículo debe ser útil.
          </li>
          <li>
            Usa un lenguaje directo y simple que un niño de 10 años pueda
            entender.
          </li>
        </ol>
      </div>

      <button
        onClick={handleCopyClick}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Copiar Prompt
      </button>
    </div>
  );
};

export default Prompt;
