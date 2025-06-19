const $d = window.document;

$d.addEventListener("DOMContentLoaded", () => {

    let consumo_mensual_ajustado = 0; //+20%
    let consumo_diario_ajustado = 0; //+kWh
    const horas_sol_pico = 4.5; // HSP
    const potencia_por_panel = 585; // W
    const eficiencia_del_sistema = 0.8;
    let energia_diaria_generada_por_panel = 0;
    let cantidad_de_paneles_necesarios = 0;
    let potencia_total_del_sistema = 0;
    let area_estimada_requerida = 0;
    const autonomia_de_baterias = 1;
    let capacidad_total_de_baterias_requerida = 0;

    const $formulario = $d.getElementById("formulario");
    const $consumo_ingresado = $d.getElementById("consumo_mensual");
    const $consumo_mensual_element = $d.getElementById("consumo_mensual_res")
    const $consumo_mensual_ajustado_element = $d.getElementById("consumo_mensual_ajustado_res")
    const $consumo_diario_ajustado_element = $d.getElementById("consumo_diario_ajustado_res");
    const $energia_diaria_generada_por_panel_element = $d.getElementById("energia_diaria_generada_por_panel_res");
    const $cantidad_de_paneles_necesarios_element = $d.getElementById("cantidad_de_paneles_necesarios_res"); const $potencia_total_del_sistema_element = $d.getElementById("potencia_total_del_sistema_res");
    const $area_estimada_requerida_element = $d.getElementById("area_estimada_requerida_res");
    const $capacidad_total_de_baterias_requerida_element = $d.getElementById("capacidad_total_de_baterias_requerida_res");
    const $kit_adecuado_element = $d.getElementById("kit_adecuado");

    const $error_text_element = $d.getElementById("error_text")


    $formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        let consumo_mensual = parseFloat($consumo_ingresado.value);

        if (isNaN(consumo_mensual) || consumo_mensual === "") {
            // $consumo_mensual_element.textContent = "El valor ingresado no es valido"
            $error_text_element.classList.remove("error-text-oculto")
            $error_text_element.classList.add("error-text")
            return;
        }

        $consumo_mensual_element.textContent = consumo_mensual;

        // Calculos
        consumo_mensual_ajustado = parseFloat(
            (consumo_mensual * 1.2).toFixed(2)
        );
        consumo_diario_ajustado = parseFloat(
            (consumo_mensual_ajustado / 30).toFixed(2)
        );
        energia_diaria_generada_por_panel = parseFloat(
            ((potencia_por_panel / 1000) * horas_sol_pico * eficiencia_del_sistema).toFixed(3)
        );
        cantidad_de_paneles_necesarios = parseFloat(
            (consumo_diario_ajustado / energia_diaria_generada_por_panel).toFixed(2)
        )
        potencia_total_del_sistema = parseFloat(
            (cantidad_de_paneles_necesarios * (potencia_por_panel / 1000)).toFixed(2)
        );
        area_estimada_requerida = parseFloat(
            (cantidad_de_paneles_necesarios * 2.4).toFixed(2)
        );
        capacidad_total_de_baterias_requerida = parseFloat(
            (consumo_diario_ajustado / 0.8).toFixed(2)
        );

        const kitAdecuado = (cantidad_de_paneles_necesarios) => {
            if (cantidad_de_paneles_necesarios <= 3) {
                return "1";
            } else if (cantidad_de_paneles_necesarios <= 4) {
                return "2";
            } else if (cantidad_de_paneles_necesarios <= 6) {
                return "3";
            } else if (cantidad_de_paneles_necesarios <= 8) {
                return "4";
            } else {
                return "5";
            }
        };


        // Interacción DOM
        $consumo_mensual_ajustado_element.textContent = consumo_mensual_ajustado;
        $consumo_diario_ajustado_element.textContent = consumo_diario_ajustado;
        $energia_diaria_generada_por_panel_element.textContent = energia_diaria_generada_por_panel;
        $cantidad_de_paneles_necesarios_element.textContent = cantidad_de_paneles_necesarios;
        $potencia_total_del_sistema_element.textContent = potencia_total_del_sistema;
        $area_estimada_requerida_element.textContent = area_estimada_requerida;
        $capacidad_total_de_baterias_requerida_element.textContent = capacidad_total_de_baterias_requerida;

        $kit_adecuado_element.textContent = kitAdecuado(cantidad_de_paneles_necesarios);


        // Animación de resultados
        const $cardInicio = $d.querySelector(".card-inicio");
        const $resultado = $d.getElementById("resultado");

        $cardInicio.style.display = "none";
        $resultado.classList.add("show");

        const items = $resultado.querySelectorAll("#resultado-item, #resultdo-item");
        items.forEach((item, i) => item.style.setProperty("--i", i));

    });


});

