# Validador de formularios

Validador genérico de formularios en javascript.

## Instalación

## Como empezar
Lo único que tendremos que tener en cuenta, dentro del formulario de HTML, es que los elementos donde mostremos los mensajes de error deben llevar el atributo `data-form-message`.

```html
<form id="form1" action="/" method="POST">
    <fieldset>
        <legend>Legend</legend>
        <div>
            <label for="textFieldExample">Label: </label>
            <input id="textFieldExample" type="text" name="textFieldExample" placeholder="Escribe algo" />
            <p data-form-message></p>
        </div>
        <div>
            <label for="nifFieldExample">NIF: </label>
            <input id="nifFieldExample" type="text" name="nifFieldExample" placeholder="Ej: 99999999Z" />
            <p data-form-message></p>
        </div>
        <div>
            <input type="submit" value="Input submit" />
        </div>
    </fieldset>
</form>
```
<br>

## Inicialización de la librería

```javascript
    const form = document.getElementById('form1');

    const validator = new Validator(form, {
        rules: {
            textFieldExample: {
                required: true,
                minlength: 2,
                maxlength: 8
            },
            nifFieldExample: {
                nif: true
            }
        },
        messages: {
            textFieldExample: {
                required: "Debe rellenar este campo",
                minlength: "El texto debe tener mínimo 2 caracteres",
                maxlength: "El texto debe tener máximo 8 caracteres"
            },
            nifFieldExample: {
                nif: "Debe escribir un NIF válido. Pj: 99999999Z"
            }
        }
    });

    validator.init();
```
<br>

## Rules

Las reglas se pasan en un **object** y se debe asociar el name del input con el nombre de las reglas existentes. El formato es el siguiente:

```javascript
    rules: {
        inputName: {
            ruleName: value
        }
    }
```

Las reglas disponibles por defecto son las siguientes:

|Rule Name       |Value Type                     |Description              |
|----------------|-------------------------------|-------------------------|
|`cif`           |**boolean**                    | Formato de CIF          |
|`cp`            |**boolean**                    | Formato de código postal|
|`digits`        |**boolean**                    | Solo dígitos            |
|`email`         |**boolean**                    | Formato email           |
|`maxlength`     |**number**                     | Tamaño máximo           |
|`minlength`     |**number**                     | Tamaño mínimo           |
|`nie`           |**boolean**                    | Formato de NIE          |
|`nif`           |**boolean**                    | Formato de NIF          |
|`required`      |**boolean**                    | Campo obligatorio       |

---
<br>

### Mensajes de error
Para añadir mensajes tenemos que incluir el objecto ``messages`` dentro de las opciones del validador. Su formato es el siguiente:

```javascript
    messages: {
        inputName: {
            ruleName: 'Mensaje de error'
        }
    }
```

<br>

## Otras opciones

Podemos añadir varias opciones más al validador de las antes mencionadas. Una de ellas es el **object** ``customRules``. Con este objeto podemos definir nuestras propias reglas.  

Los parámetros que nos devuelve el validador para ejecutar nuestra **customRule** son el ``input`` y el valor de la regla. El formato es el siguiente:  

```javascript
    //optional object
    customRules: {
        customRuleName: (input, ruleValue) => {
            return input.value === ruleValue;
        }
    },
    rules: {
        inputName: {
            customRuleName: "customValue"
        }
    },
    messages: {
        inputName: {
            customRuleName: "Los valores no coinciden"
        }
    }
```

Otra opción que tenemos es ``onfocusout`` lo que nos permite validar cada input al perder el foco. Simplemente añadiremos lo siguiente a las opciones:

```javascript
{
    //optional object
    onfocusout: true
}
```

Por último, si queremos añadir una clase de error cuando la validación sea incorrecta añadiremos ``errorClass`` a las opciones del validador. Un ejemplo de ello:

```javascript
{
    //optional object
    errorClass: "errorClass"
}
```