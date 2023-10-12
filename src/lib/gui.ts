import { Pane, TabApi } from "tweakpane"
import { declarePane } from 'tweakpane-declarative'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import * as CameraKit from '@tweakpane/plugin-camerakit'

export function testGui1(div: string) {
    let pane = undefined

    if (0) {
        const PARAMS = [
            { button: 'reset', events: [resetCallback] },
            { input: 'checkbox', default: false },
            { input: 'quantity', min: 0, max: 100, step: 10, default: 20 },
            { input: 'point2d', default: { x: 50, y: 25 }, picker: 'inline', expanded: true },
            { input: 'debug', label: 'Debug on/off', default: false },
            { input: 'theme', label: 'Theme', default: 'light', options: { Dark: 'dark', Light: 'light' } },
        ];

        function resetCallback() { }

        pane = declarePane(PARAMS, {
            title: 'Parameters',
            container: document.getElementById(div)
        })
    }
    else {
        pane = new Pane({
            title: 'Parameters',
            container: document.getElementById(div)
        })
    }

    pane.registerPlugin(EssentialsPlugin)
    pane.registerPlugin(CameraKit)

    // ----------------------------------
    {
        pane.addBlade({
            view: 'fpsgraph',
            label: 'fps',
        })
    }
    // ----------------------------------
    {
        const params = {
            scale: 25,
        };

        const scales = [10, 20, 25, 50, 75, 100];
        pane.addBinding(params, 'scale', {
            view: 'radiogrid',
            groupName: 'scale',
            size: [3, 2],
            cells: (x, y) => ({
                title: `${scales[y * 3 + x]}%`,
                value: scales[y * 3 + x],
            }),

            label: 'radiogrid',
        })
    }
    // ----------------------------------
    {
        pane.addBlade({
            view: 'buttongrid',
            size: [3, 3],
            cells: (x, y) => ({
                title: [
                    ['NW', 'N', 'NE'],
                    ['W', '*', 'E'],
                    ['SW', 'S', 'SE'],
                ][y][x],
            }),
            label: 'buttongrid',
        })
    }
    // ----------------------------------
    {
        pane.addBlade({
            view: 'cubicbezier',
            value: [0.5, 0, 0.5, 1],

            expanded: true,
            label: 'cubicbezier',
            picker: 'inline',
        })
    }
    // ----------------------------------
    {
        const params = {
            fNumber: 1.8,
            focalLength: 50,
            iso: 1600,
        };

        const f1 = pane.addFolder({
            title: 'default',
        });
        f1.addBinding(params, 'focalLength', {
            view: 'cameraring',
            // appearance of ring view
            series: 0,
            label: 'ring-0',
        });
        f1.addBinding(params, 'fNumber', {
            view: 'cameraring',
            series: 1,
            // scale unit
            unit: {
                // pixels for unit
                pixels: 50,
                // number of ticks for unit
                ticks: 10,
                // value for unit
                value: 0.2,
            },
            step: 0.02,
            label: 'ring-1',
        });
        f1.addBinding(params, 'focalLength', {
            view: 'cameraring',
            series: 2,
            label: 'ring-2',
        });
        f1.addBinding(params, 'iso', {
            view: 'camerawheel',

            // amount of value per pixel
            amount: 100,
            min: 100,
            step: 100,
            label: 'wheel',
        });

        const f2 = pane.addFolder({
            title: 'wide',
        });
        f2.addBinding(params, 'focalLength', {
            view: 'cameraring',
            series: 0,
            // hides text input
            wide: true,
            label: 'ring-0',
        });
        f2.addBinding(params, 'fNumber', {
            view: 'cameraring',
            series: 1,
            unit: {
                pixels: 60,
                ticks: 10,
                value: 0.2,
            },
            wide: true,
            step: 0.02,
            label: 'ring-1',
        });
        f2.addBinding(params, 'focalLength', {
            view: 'cameraring',
            series: 2,
            wide: true,
            label: 'ring-2',
        });
        f2.addBinding(params, 'iso', {
            view: 'camerawheel',
            wide: true,
            amount: 100,
            min: 100,
            step: 100,
            label: 'wheel',
        });
    }
    // ----------------------------------

    return pane
}

export function testGui2(div: string) {
    const pane = new Pane({
        title: 'Parameters',
        container: document.getElementById(div),
        // expanded: false
    })

    const PARAMS = {
        speed: 0.5,
        quality: 0,
        k: 0,
        theme: '',
        hidden: true,
        background: { r: 255, g: 0, b: 55 },
        key: '#ff0055ff',
        offset: { x: 50, y: 25 },
        camera: { x: 0, y: 20, z: -10 },
        color: { x: 0, y: 0, z: 0, w: 1 },
        text: "0" // readonly
    }


    pane.addBinding(PARAMS, 'speed')
    pane.addBinding(PARAMS, 'speed', { min: 0, max: 100, })
    pane.addBinding(PARAMS, 'quality', {
        options: {
            low: 0,
            medium: 50,
            high: 100,
        },
    })
    pane.addBinding(PARAMS, 'k', {
        format: (v) => v.toFixed(6),
    })
    pane.addBinding(PARAMS, 'theme', {
        options: {
            none: '',
            dark: 'dark-theme.json',
            light: 'light-theme.json',
        },
    })
    pane.addBinding(PARAMS, 'hidden')
    pane.addBinding(PARAMS, 'background')
    pane.addBinding(PARAMS, 'key', {
        picker: 'inline',
        expanded: true,
    })
    pane.addBinding(PARAMS, 'offset')
    pane.addBinding(PARAMS, 'camera', {
        y: { step: 10 },
        z: { max: 0 },
    })
    pane.addBinding(PARAMS, 'color', {
        x: { min: 0, max: 1 },
        y: { min: 0, max: 1 },
        z: { min: 0, max: 1 },
        w: { min: 0, max: 1 },
    })

    const f1 = pane.addFolder({
        title: 'More',
    })

    const btn = f1.addButton({
        title: 'Increment',
        label: 'counter',   // optional
    })
    let count = 0

    btn.on('click', () => {
        count += 1;
        PARAMS.text = count.toString()
    })

    pane.addBinding(PARAMS, 'text', {
        readonly: true,
    })
}

export function gui(div: string) {
    const pane = new Pane({
        title: 'Parameters',
        container: document.getElementById(div)
    })
    // pane.element.style.fontSize = "16px"

    const tab = pane.addTab({
        pages: [
            { title: 'Parameters' },
            { title: 'Advanced' },
            { title: 'Help' },
            { title: 'About' }
        ]
    })

    const PARAMS = {
        factor: 123,
        title: 'hello',
        color: '#ff0055',
    }

    tab.pages[0].addBinding(PARAMS, 'factor')
    tab.pages[0].addBinding(PARAMS, 'title')
    tab.pages[0].addBinding(PARAMS, 'color')

    tab.pages[1].addBinding(PARAMS, 'factor')

    return pane
}

export class MultiPanel {
    private pane: Pane = undefined

    constructor(div: string, protected title: string) {
        this.pane = new Pane({
            title,
            container: document.getElementById(div)
        })
    }

    addPanels(titles: string[]): TabApi {
        return this.pane.addTab({
            pages: titles.map(s => {
                return { title: s }
            })
        })
    }

    addUpload({ label, cb }: { label: string, cb: Function }) {
        let file = null
        this.pane.addButton({
            title: label,
        }).on('click', () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.style.opacity = '0';
            input.style.position = 'fixed';
            document.body.appendChild(input);
            input.addEventListener('input', (ev) => {
                file = input.files[0];
                document.body.removeChild(input);
                cb(file)
            }, { once: true })
            input.click();
        })
    }

    // addCombo({ label, list }: { label: string, list: { text: string, value: string }[] }) {
    //     this.pane.addBinding(
    //         PARAMS, 'theme',
    //         { options: { Dark: 'dark', Light: 'light' } }
    //     )

    //     this.pane.addBlade({
    //         view: 'list',
    //         label,
    //         options: list,
    //         // value: list[0].value
    //     });
    // }
}

/*
{
    div: "gui",
    title: "Parameters",
    panels: [
        {
            title: "Setup",
            widgets: [
                upload: {
                    title: "Upload",
                    label: "Click",
                    event: (e) => console.log(e)
                },
                
            ]
        }
    ]
}
*/

export function generatePanel(json: any): Pane | undefined {
    const pane = new Pane({
        title: json.title,
        container: document.getElementById(json.div)
    })

    // Add the tabs if any
    if (json.panels) {
        pane.addTab({ pages: json.panels.map(p => { return { title: p.title } }) })

        // for each tab add the widgets
        json.panels.map(p => {
            if (p.widgets) {
                p.widgets.forEach(w => {

                })
            }
        })
    }

    return pane
}