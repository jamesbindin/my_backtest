/**
 * @param SVGElement - DOMElement of svg block
 * @param MoveMouseEvent - object of mouse move event
 * @returns {{x: number, y: number}}
 */
export function useMouseCoordinatesRelativeToSvg( SVGElement: SVGSVGElement, MoveMouseEvent: MouseEvent ) {
    // get a sizes and position of svg element, relative browser viewport (page piece, showed on a screen, which we can see)
    let svg_element_position = SVGElement.getBoundingClientRect(),
        // difference coefficients between HTML element and svg viewbox sizes.
        svg_sizes_factor = {
            x: SVGElement.viewBox.baseVal.width / svg_element_position.width,
            y: SVGElement.viewBox.baseVal.height / svg_element_position.height
        };

    // calculates the position of the cursor relative to the svg viewbox.
    return {
        x: Math.round( (MoveMouseEvent.clientX - svg_element_position.x) * svg_sizes_factor.x + SVGElement.viewBox.baseVal.x ),
        y: Math.round( (MoveMouseEvent.clientY - svg_element_position.y) * svg_sizes_factor.y + SVGElement.viewBox.baseVal.y )
    };
}